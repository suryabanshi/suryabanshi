"""
Deduplication layer.
Two strategies:
1. Hash-based: exact content matches (fast, done at ingestion)
2. Semantic: near-duplicate detection using pgvector cosine similarity
"""
from __future__ import annotations

import logging
from typing import Optional

logger = logging.getLogger(__name__)


class SemanticDeduplicator:
    """
    Finds near-duplicate knowledge items using vector similarity.
    Should be run after embeddings are generated.

    Usage:
        dedup = SemanticDeduplicator(db_client, threshold=0.92)
        dupes = dedup.find_duplicates(item_id, embedding)
        if dupes:
            dedup.merge(item_id, dupes[0]["id"])
    """

    def __init__(self, db_client, threshold: float = 0.92):
        self.db = db_client
        self.threshold = threshold

    def find_duplicates(
        self, item_id: str, embedding: list[float]
    ) -> list[dict]:
        """Returns knowledge items similar enough to be considered duplicates."""
        try:
            response = self.db.rpc(
                "search_knowledge",
                {
                    "query_embedding": embedding,
                    "match_threshold": self.threshold,
                    "match_count": 5,
                },
            ).execute()
            results = response.data or []
            # Exclude the item itself
            return [r for r in results if r["id"] != item_id]
        except Exception as exc:  # noqa: BLE001
            logger.error("Semantic dedup query failed: %s", exc)
            return []

    def merge(self, keep_id: str, discard_id: str) -> None:
        """
        Merges discard_id into keep_id:
          - Moves all relationships from discard to keep
          - Moves all tags from discard to keep
          - Marks discard as a duplicate (sets importance_score = 0)
        """
        try:
            # Update relationships
            self.db.table("relationships").update({"from_id": keep_id}).eq(
                "from_id", discard_id
            ).execute()
            self.db.table("relationships").update({"to_id": keep_id}).eq(
                "to_id", discard_id
            ).execute()

            # Move tags (ignore conflicts)
            existing = (
                self.db.table("knowledge_item_tags")
                .select("tag_id, confidence, is_auto_tagged")
                .eq("knowledge_item_id", discard_id)
                .execute()
                .data or []
            )
            for row in existing:
                try:
                    self.db.table("knowledge_item_tags").upsert(
                        {
                            "knowledge_item_id": keep_id,
                            "tag_id": row["tag_id"],
                            "confidence": row["confidence"],
                            "is_auto_tagged": row["is_auto_tagged"],
                        },
                        on_conflict="knowledge_item_id,tag_id",
                    ).execute()
                except Exception:  # noqa: BLE001
                    pass

            # Mark duplicate as low importance / archived
            self.db.table("knowledge_items").update(
                {"importance_score": 0.0, "subcategory": "DUPLICATE"}
            ).eq("id", discard_id).execute()

            logger.info("Merged %s into %s", discard_id, keep_id)
        except Exception as exc:  # noqa: BLE001
            logger.error("Merge failed (%s -> %s): %s", discard_id, keep_id, exc)

    def run_batch_dedup(self, limit: int = 100) -> int:
        """
        Scans recent knowledge items and auto-merges exact semantic duplicates.
        Returns count of merged pairs.
        """
        # Fetch recent items with embeddings
        response = (
            self.db.table("knowledge_items")
            .select("id, title, embedding")
            .not_.is_("embedding", "null")
            .neq("subcategory", "DUPLICATE")
            .order("created_at", desc=True)
            .limit(limit)
            .execute()
        )
        items = response.data or []
        merged = 0
        seen_ids: set[str] = set()

        for item in items:
            if item["id"] in seen_ids:
                continue
            dupes = self.find_duplicates(item["id"], item["embedding"])
            for dupe in dupes:
                if dupe["id"] not in seen_ids:
                    self.merge(item["id"], dupe["id"])
                    seen_ids.add(dupe["id"])
                    merged += 1

        logger.info("Batch dedup: merged %d pairs from %d items", merged, len(items))
        return merged
