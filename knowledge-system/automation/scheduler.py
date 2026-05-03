"""
Scheduler — runs all sync and processing jobs on a cron-like schedule.
Can be run as a standalone process or triggered by a cron job / n8n webhook.
"""
from __future__ import annotations

import logging
import time
from datetime import datetime, timezone
from typing import Optional

logger = logging.getLogger(__name__)


def run_ingestion_job(settings, db_client) -> dict:
    """
    Runs all configured data source connectors and normalizes new documents.
    Returns a summary dict.
    """
    from ingestion.normalizer import Normalizer

    summary = {"sources_run": 0, "total_inserted": 0, "total_skipped": 0, "errors": []}

    # Fetch active sources from database
    sources = db_client.table("data_sources").select("*").eq("is_active", True).execute().data or []

    for source in sources:
        try:
            inserted, skipped = _run_source(source, settings, db_client)
            summary["total_inserted"] += inserted
            summary["total_skipped"] += skipped
            summary["sources_run"] += 1

            # Update last_synced_at
            db_client.table("data_sources").update({
                "last_synced_at": datetime.now(timezone.utc).isoformat(),
                "total_records": source.get("total_records", 0) + inserted,
            }).eq("id", source["id"]).execute()

        except Exception as exc:  # noqa: BLE001
            logger.error("Source %s failed: %s", source["name"], exc)
            summary["errors"].append({"source": source["name"], "error": str(exc)})

    return summary


def _run_source(source: dict, settings, db_client) -> tuple[int, int]:
    from ingestion.normalizer import Normalizer
    source_type = source["source_type"]
    config = source.get("config", {})
    norm = Normalizer(settings.supabase_url, settings.supabase_service_key, source["id"])

    if source_type == "google_drive":
        from ingestion.connectors.google_drive import GoogleDriveConnector
        connector = GoogleDriveConnector(
            credentials_file=settings.google_credentials_file,
            folder_id=config.get("folder_id"),
            page_token=source.get("sync_cursor"),
        )
        docs, new_cursor = connector.extract()
        if new_cursor:
            db_client.table("data_sources").update({"sync_cursor": new_cursor}).eq("id", source["id"]).execute()
        return norm.ingest_batch(docs)

    if source_type == "notion":
        from ingestion.connectors.notion import NotionConnector
        connector = NotionConnector(
            api_key=config.get("api_key") or settings.notion_api_key,
            database_ids=config.get("database_ids") or settings.notion_database_ids,
        )
        docs = list(connector.extract())
        return norm.ingest_batch(docs)

    if source_type == "dropbox":
        from ingestion.connectors.dropbox import DropboxConnector
        connector = DropboxConnector(
            access_token=config.get("access_token") or settings.dropbox_access_token,
            cursor=source.get("sync_cursor"),
            path=config.get("path", ""),
        )
        docs = list(connector.extract())
        if connector.cursor:
            db_client.table("data_sources").update({"sync_cursor": connector.cursor}).eq("id", source["id"]).execute()
        return norm.ingest_batch(docs)

    if source_type in ("pdf", "word", "excel", "markdown", "text"):
        from ingestion.connectors.file_processor import LocalFileConnector
        connector = LocalFileConnector(config["root_path"], recursive=config.get("recursive", True))
        docs = list(connector.extract())
        return norm.ingest_batch(docs)

    if source_type == "github":
        from ingestion.connectors.github_connector import GitHubConnector
        connector = GitHubConnector(
            token=config.get("token") or settings.github_token,
            username=config.get("username") or settings.github_username,
        )
        docs = list(connector.extract())
        return norm.ingest_batch(docs)

    if source_type in ("chat_gpt", "claude", "gemini"):
        from ingestion.connectors.chat_history import ChatHistoryConnector
        platform_map = {"chat_gpt": "chatgpt", "claude": "claude", "gemini": "generic_jsonl"}
        connector = ChatHistoryConnector(
            file_path=config["file_path"],
            platform=platform_map[source_type],
        )
        docs = list(connector.extract())
        return norm.ingest_batch(docs)

    logger.warning("Unknown source type: %s", source_type)
    return 0, 0


def run_processing_job(settings, db_client) -> dict:
    """Runs the AI processing pipeline on pending raw documents."""
    from processing.extractor import KnowledgeExtractor
    from processing.tagger import AutoTagger
    from processing.summarizer import EmbeddingGenerator, ProcessingPipeline

    extractor = KnowledgeExtractor(
        api_key=settings.anthropic_api_key,
        model=settings.claude_model,
    )
    tagger = AutoTagger(db_client=db_client)
    embedder = EmbeddingGenerator(
        api_key=getattr(settings, "openai_api_key", ""),
        model=settings.embedding_model,
    )
    pipeline = ProcessingPipeline(db_client, extractor, tagger, embedder)
    processed = pipeline.run(batch_size=settings.batch_size)
    return {"processed": processed}


def run_insight_job(settings, db_client) -> dict:
    """Runs the analysis engine to generate fresh insights."""
    from analysis.insight_engine import InsightEngine
    engine = InsightEngine(
        db_client=db_client,
        api_key=settings.anthropic_api_key,
        model=settings.claude_model,
    )
    count = engine.generate_insights()
    return {"insights_generated": count}


def main_loop(settings, db_client) -> None:
    """
    Blocking loop — runs ingestion + processing + insights on schedule.
    For production, replace with Celery beat, APScheduler, or n8n cron.
    """
    import schedule

    schedule.every(settings.sync_interval_minutes).minutes.do(
        run_ingestion_job, settings=settings, db_client=db_client
    )
    schedule.every(settings.sync_interval_minutes + 5).minutes.do(
        run_processing_job, settings=settings, db_client=db_client
    )
    schedule.every(settings.insight_refresh_hours).hours.do(
        run_insight_job, settings=settings, db_client=db_client
    )

    logger.info("Scheduler started. Sync every %d min.", settings.sync_interval_minutes)

    # Run immediately on startup
    run_ingestion_job(settings, db_client)
    run_processing_job(settings, db_client)

    while True:
        schedule.run_pending()
        time.sleep(30)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    from config.settings import settings
    from supabase import create_client
    db = create_client(settings.supabase_url, settings.supabase_service_key)
    main_loop(settings, db)
