"""
Processing pipeline orchestrator.
Reads pending raw_documents, runs extraction, generates embeddings,
saves knowledge_items, ideas, opportunities, contacts, and tags.
"""
from __future__ import annotations

import logging
from typing import Optional

import anthropic

logger = logging.getLogger(__name__)


class EmbeddingGenerator:
    """
    Generates text embeddings using OpenAI or a compatible API.
    Falls back to a zero-vector if embedding service is unavailable.
    """

    def __init__(self, api_key: str, model: str = "text-embedding-3-small"):
        try:
            from openai import OpenAI
            self.client = OpenAI(api_key=api_key)
            self.model = model
            self._available = True
        except ImportError:
            logger.warning("openai package not installed — embeddings disabled")
            self._available = False

    def embed(self, text: str) -> Optional[list[float]]:
        if not self._available:
            return None
        try:
            response = self.client.embeddings.create(
                model=self.model,
                input=text[:8000],  # token safety
            )
            return response.data[0].embedding
        except Exception as exc:  # noqa: BLE001
            logger.error("Embedding failed: %s", exc)
            return None

    def embed_batch(self, texts: list[str]) -> list[Optional[list[float]]]:
        if not self._available:
            return [None] * len(texts)
        try:
            # OpenAI accepts batch up to 2048 inputs
            response = self.client.embeddings.create(
                model=self.model,
                input=[t[:8000] for t in texts],
            )
            results: list[Optional[list[float]]] = [None] * len(texts)
            for item in response.data:
                results[item.index] = item.embedding
            return results
        except Exception as exc:  # noqa: BLE001
            logger.error("Batch embedding failed: %s", exc)
            return [None] * len(texts)


class ProcessingPipeline:
    """
    Full pipeline: raw_document → knowledge_item + ideas + opportunities + tags.

    Usage:
        pipeline = ProcessingPipeline(db, extractor, tagger, embedder)
        processed = pipeline.run(batch_size=20)
    """

    def __init__(self, db_client, extractor, tagger, embedder: EmbeddingGenerator):
        self.db = db_client
        self.extractor = extractor
        self.tagger = tagger
        self.embedder = embedder

    def run(self, batch_size: int = 20) -> int:
        pending = self._fetch_pending(batch_size)
        if not pending:
            logger.info("No pending documents.")
            return 0

        processed = 0
        for doc in pending:
            try:
                self._process_doc(doc)
                self._mark_processed(doc["id"])
                processed += 1
            except Exception as exc:  # noqa: BLE001
                logger.error("Pipeline error for doc %s: %s", doc["id"], exc)
                self._mark_failed(doc["id"], str(exc))

        logger.info("Pipeline run complete — processed %d documents", processed)
        return processed

    def _fetch_pending(self, limit: int) -> list[dict]:
        response = (
            self.db.table("raw_documents")
            .select("id, title, raw_content, source_id")
            .eq("processing_status", "pending")
            .not_.is_("raw_content", "null")
            .limit(limit)
            .execute()
        )
        return response.data or []

    def _process_doc(self, doc: dict) -> None:
        # 1. Extract structured knowledge
        result = self.extractor.extract(doc["raw_content"], raw_doc_id=doc["id"])
        if not result:
            raise ValueError("Extraction returned None")

        # 2. Generate embedding from title + summary
        embed_text = f"{result.title}\n\n{result.summary}"
        embedding = self.embedder.embed(embed_text)

        # 3. Insert knowledge_item
        ki_payload = {
            "raw_doc_id": doc["id"],
            "title": result.title,
            "summary": result.summary,
            "full_content": doc["raw_content"][:50_000],
            "category": result.category,
            "subcategory": result.subcategory,
            "importance_score": result.importance_score,
            "key_topics": result.key_topics,
            "key_entities": result.key_entities,
            "sentiment": result.sentiment,
            "word_count": len(doc["raw_content"].split()),
        }
        if embedding:
            ki_payload["embedding"] = embedding

        ki_res = self.db.table("knowledge_items").insert(ki_payload).execute()
        ki_id = ki_res.data[0]["id"]

        # 4. Insert extracted ideas
        for idea in result.ideas:
            self.db.table("ideas").insert({
                "title": idea.get("title", "Untitled Idea")[:500],
                "description": idea.get("description", ""),
                "viability_score": float(idea.get("viability", 0.5)),
                "source_item_id": ki_id,
                "status": "raw",
            }).execute()

        # 5. Insert extracted opportunities
        for opp in result.opportunities:
            rev_map = {"low": 500, "medium": 3000, "high": 10000}
            rev_level = opp.get("revenue_potential", "medium").lower()
            self.db.table("opportunities").insert({
                "title": opp.get("title", "Untitled Opportunity")[:500],
                "description": opp.get("description", ""),
                "estimated_revenue_monthly": rev_map.get(rev_level, 3000),
                "source_item_ids": [ki_id],
                "stage": "discovered",
            }).execute()

        # 6. Tag the knowledge item
        tags = self.tagger.generate_tags(result)
        slug_to_id = self.tagger.upsert_tags(tags)
        self.tagger.assign_tags(ki_id, tags, slug_to_id)

        # 7. Record timeline event
        self.db.table("timeline_events").insert({
            "entity_table": "knowledge_items",
            "entity_id": ki_id,
            "event_type": "created",
            "description": f"Extracted from raw document: {doc.get('title', doc['id'])}",
            "snapshot": {"category": result.category, "importance": result.importance_score},
        }).execute()

    def _mark_processed(self, doc_id: str) -> None:
        from datetime import datetime, timezone
        self.db.table("raw_documents").update({
            "processing_status": "completed",
            "processed_at": datetime.now(timezone.utc).isoformat(),
        }).eq("id", doc_id).execute()

    def _mark_failed(self, doc_id: str, error: str) -> None:
        self.db.table("raw_documents").update({
            "processing_status": "failed",
            "processing_error": error[:1000],
        }).eq("id", doc_id).execute()
