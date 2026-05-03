"""Knowledge Base CRUD + semantic search endpoints."""
from __future__ import annotations

from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel

from api.routes._deps import get_db

router = APIRouter()


# ── Response models ───────────────────────────────────────────────────────────

class KnowledgeItemOut(BaseModel):
    id: str
    title: str
    summary: str
    category: str
    subcategory: Optional[str]
    importance_score: float
    key_topics: list[str]
    sentiment: Optional[str]
    created_at: str


class SemanticSearchRequest(BaseModel):
    query: str
    limit: int = 10
    threshold: float = 0.70
    category: Optional[str] = None


# ── Endpoints ─────────────────────────────────────────────────────────────────

@router.get("/", response_model=list[KnowledgeItemOut])
def list_knowledge_items(
    category: Optional[str] = None,
    min_importance: float = Query(0.0, ge=0.0, le=1.0),
    limit: int = Query(20, le=100),
    offset: int = 0,
    db=Depends(get_db),
):
    query = (
        db.table("knowledge_items")
        .select("id,title,summary,category,subcategory,importance_score,key_topics,sentiment,created_at")
        .gte("importance_score", min_importance)
        .order("importance_score", desc=True)
        .range(offset, offset + limit - 1)
    )
    if category:
        query = query.eq("category", category)
    return query.execute().data or []


@router.get("/{item_id}")
def get_knowledge_item(item_id: UUID, db=Depends(get_db)):
    res = db.table("knowledge_items").select("*").eq("id", str(item_id)).single().execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Item not found")
    return res.data


@router.post("/search")
def semantic_search(body: SemanticSearchRequest, db=Depends(get_db)):
    """
    Full-text search (semantic search requires embedding generation endpoint).
    """
    query = (
        db.table("knowledge_items")
        .select("id,title,summary,category,importance_score")
        .text_search("title,summary", body.query)
        .order("importance_score", desc=True)
        .limit(body.limit)
    )
    if body.category:
        query = query.eq("category", body.category)
    return {"results": query.execute().data or []}


@router.get("/focus-areas")
def get_focus_areas(db=Depends(get_db)):
    """Returns the topics you think about most, ranked by frequency."""
    res = db.table("v_focus_areas").select("*").execute()
    return res.data or []


@router.get("/stats/overview")
def get_stats(db=Depends(get_db)):
    counts = {}
    for table in ["knowledge_items", "ideas", "opportunities", "contacts", "content_library"]:
        res = db.table(table).select("id", count="exact").execute()
        counts[table] = res.count or 0
    insights_res = db.table("insights").select("id", count="exact").eq("is_dismissed", False).execute()
    counts["active_insights"] = insights_res.count or 0
    return counts
