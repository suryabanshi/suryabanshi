"""Webhook ingestion endpoint — accepts documents from Zapier/Make/n8n."""
from __future__ import annotations

import hashlib
from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from pydantic import BaseModel

from api.routes._deps import get_db, get_settings

router = APIRouter()


class WebhookIngestRequest(BaseModel):
    source_type: str
    title: Optional[str] = None
    raw_content: Optional[str] = None
    source_url: Optional[str] = None
    external_id: Optional[str] = None
    source_metadata: Optional[dict] = None


@router.post("/webhook")
def webhook_ingest(
    body: WebhookIngestRequest,
    background_tasks: BackgroundTasks,
    db=Depends(get_db),
    settings=Depends(get_settings),
):
    """
    Accepts a document from any external source.
    Returns immediately with a raw_doc_id; processing happens in background.
    """
    content = body.raw_content or ""
    if not content and not body.source_url:
        raise HTTPException(status_code=422, detail="Provide raw_content or source_url")

    content_hash = hashlib.sha256(content.encode()).hexdigest()

    # Find or create the data source record
    source_id = _ensure_source(db, body.source_type)

    # Check dedup
    existing = (
        db.table("raw_documents")
        .select("id")
        .eq("source_id", source_id)
        .eq("content_hash", content_hash)
        .execute()
        .data or []
    )
    if existing:
        return {"status": "duplicate", "raw_doc_id": existing[0]["id"]}

    # Insert raw document
    res = db.table("raw_documents").insert({
        "source_id": source_id,
        "external_id": body.external_id,
        "title": (body.title or "Webhook Document")[:500],
        "raw_content": content,
        "content_hash": content_hash,
        "mime_type": "text/plain",
        "file_size_bytes": len(content.encode()),
        "source_url": body.source_url,
        "source_metadata": body.source_metadata or {},
        "processing_status": "pending",
    }).execute()

    raw_doc_id = res.data[0]["id"]

    # Kick off processing in background
    background_tasks.add_task(_process_doc, raw_doc_id, db, settings)

    return {"status": "queued", "raw_doc_id": raw_doc_id}


def _ensure_source(db, source_type: str) -> str:
    res = (
        db.table("data_sources")
        .select("id")
        .eq("source_type", source_type)
        .eq("name", f"webhook:{source_type}")
        .execute()
        .data or []
    )
    if res:
        return res[0]["id"]
    insert = db.table("data_sources").insert({
        "name": f"webhook:{source_type}",
        "source_type": source_type,
        "is_active": True,
    }).execute()
    return insert.data[0]["id"]


def _process_doc(raw_doc_id: str, db, settings) -> None:
    from processing.extractor import KnowledgeExtractor
    from processing.tagger import AutoTagger
    from processing.summarizer import EmbeddingGenerator, ProcessingPipeline

    extractor = KnowledgeExtractor(settings.anthropic_api_key, settings.claude_model)
    tagger = AutoTagger(db_client=db)
    embedder = EmbeddingGenerator(getattr(settings, "openai_api_key", ""), settings.embedding_model)
    pipeline = ProcessingPipeline(db, extractor, tagger, embedder)

    # Fetch and process the single document
    res = db.table("raw_documents").select("*").eq("id", raw_doc_id).single().execute()
    if res.data:
        pipeline._process_doc(res.data)
        pipeline._mark_processed(raw_doc_id)
