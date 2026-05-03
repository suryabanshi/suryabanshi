"""
Normalizer — takes a RawDocument and writes it to Supabase raw_documents table.
Performs content-hash-based deduplication before insert.
"""
from __future__ import annotations

import logging
from typing import Optional

from ingestion.connectors.file_processor import RawDocument

try:
    from supabase import create_client, Client
    HAS_SUPABASE = True
except ImportError:
    HAS_SUPABASE = False

logger = logging.getLogger(__name__)


class Normalizer:
    """
    Saves RawDocuments to the database after dedup check.

    Usage:
        norm = Normalizer(supabase_url, supabase_key, source_id)
        inserted, skipped = norm.ingest_batch(docs)
    """

    def __init__(self, supabase_url: str, supabase_key: str, source_id: str):
        if not HAS_SUPABASE:
            raise ImportError("supabase not installed.\nRun: pip install supabase")
        self.db: Client = create_client(supabase_url, supabase_key)
        self.source_id = source_id

    def ingest_batch(self, docs: list[RawDocument]) -> tuple[int, int]:
        """Returns (inserted_count, skipped_count)."""
        if not docs:
            return 0, 0

        # Fetch existing hashes for this source to avoid N+1 queries
        existing_hashes = self._get_existing_hashes([d.content_hash for d in docs])

        inserted = 0
        skipped = 0
        for doc in docs:
            if doc.content_hash in existing_hashes:
                logger.debug("Skipping duplicate: %s", doc.title)
                skipped += 1
                continue
            self._insert(doc)
            existing_hashes.add(doc.content_hash)
            inserted += 1

        logger.info("Batch done — inserted: %d, skipped (dup): %d", inserted, skipped)
        return inserted, skipped

    def _get_existing_hashes(self, hashes: list[str]) -> set[str]:
        if not hashes:
            return set()
        response = (
            self.db.table("raw_documents")
            .select("content_hash")
            .eq("source_id", self.source_id)
            .in_("content_hash", hashes)
            .execute()
        )
        return {row["content_hash"] for row in (response.data or [])}

    def _insert(self, doc: RawDocument) -> Optional[str]:
        payload = {
            "source_id": self.source_id,
            "external_id": doc.external_id,
            "title": doc.title[:500] if doc.title else None,
            "raw_content": doc.raw_content,
            "content_hash": doc.content_hash,
            "mime_type": doc.mime_type,
            "file_size_bytes": doc.file_size_bytes,
            "source_url": doc.source_url,
            "source_metadata": doc.source_metadata,
            "created_at_source": doc.created_at_source.isoformat() if doc.created_at_source else None,
            "processing_status": "pending",
        }
        try:
            response = self.db.table("raw_documents").insert(payload).execute()
            rows = response.data or []
            return rows[0]["id"] if rows else None
        except Exception as exc:  # noqa: BLE001
            logger.error("Insert failed for '%s': %s", doc.title, exc)
            return None
