"""Sync trigger endpoints — called by n8n/scheduler."""
from __future__ import annotations

from fastapi import APIRouter, BackgroundTasks, Depends

from api.routes._deps import get_db, get_settings

router = APIRouter()


@router.post("/run")
def run_sync(background_tasks: BackgroundTasks, db=Depends(get_db), settings=Depends(get_settings)):
    """Triggers full ingestion sync for all active sources."""
    from automation.scheduler import run_ingestion_job

    def _run():
        run_ingestion_job(settings, db)

    background_tasks.add_task(_run)
    return {"status": "sync_queued"}


@router.post("/process")
def run_process(background_tasks: BackgroundTasks, db=Depends(get_db), settings=Depends(get_settings)):
    """Processes all pending raw documents."""
    from automation.scheduler import run_processing_job

    def _run():
        run_processing_job(settings, db)

    background_tasks.add_task(_run)
    return {"status": "processing_queued"}


@router.get("/status")
def sync_status(db=Depends(get_db)):
    """Returns counts by processing status."""
    statuses = ["pending", "processing", "completed", "failed"]
    result = {}
    for status in statuses:
        res = db.table("raw_documents").select("id", count="exact").eq("processing_status", status).execute()
        result[status] = res.count or 0
    return result
