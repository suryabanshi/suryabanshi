"""Insights + Opportunities endpoints."""
from __future__ import annotations

from typing import Optional
from uuid import UUID

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException

from api.routes._deps import get_db, get_settings

router = APIRouter()


@router.get("/")
def list_insights(
    priority: Optional[str] = None,
    insight_type: Optional[str] = None,
    limit: int = 20,
    db=Depends(get_db),
):
    query = (
        db.table("insights")
        .select("*")
        .eq("is_dismissed", False)
        .order("generated_at", desc=True)
        .limit(limit)
    )
    if priority:
        query = query.eq("priority", priority)
    if insight_type:
        query = query.eq("insight_type", insight_type)
    return query.execute().data or []


@router.post("/generate")
def generate_insights(background_tasks: BackgroundTasks, db=Depends(get_db), settings=Depends(get_settings)):
    """Triggers async insight generation."""
    from analysis.insight_engine import InsightEngine

    def _run():
        engine = InsightEngine(db, settings.anthropic_api_key, settings.claude_model)
        engine.generate_insights()

    background_tasks.add_task(_run)
    return {"status": "queued"}


@router.patch("/{insight_id}/dismiss")
def dismiss_insight(insight_id: UUID, db=Depends(get_db)):
    db.table("insights").update({"is_dismissed": True}).eq("id", str(insight_id)).execute()
    return {"status": "dismissed"}


@router.get("/opportunities")
def list_opportunities(
    stage: Optional[str] = None,
    limit: int = 20,
    db=Depends(get_db),
):
    query = (
        db.table("v_opportunity_pipeline")
        .select("*")
        .limit(limit)
    )
    if stage:
        query = query.eq("stage", stage)
    return query.execute().data or []


@router.post("/opportunities/find")
def find_opportunities(background_tasks: BackgroundTasks, db=Depends(get_db), settings=Depends(get_settings)):
    """Triggers AI opportunity mining in the background."""
    from analysis.opportunity_finder import OpportunityFinder

    def _run():
        finder = OpportunityFinder(db, settings.anthropic_api_key, settings.claude_model)
        finder.find_and_rank()

    background_tasks.add_task(_run)
    return {"status": "queued"}


@router.post("/opportunities/{opp_id}/action-plan")
def generate_action_plan(opp_id: UUID, db=Depends(get_db), settings=Depends(get_settings)):
    from analysis.opportunity_finder import OpportunityFinder
    finder = OpportunityFinder(db, settings.anthropic_api_key, settings.claude_model)
    plan = finder.generate_action_plan(str(opp_id))
    if not plan:
        raise HTTPException(status_code=404, detail="Opportunity not found or plan generation failed")
    return {"action_plan": plan}
