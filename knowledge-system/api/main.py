"""
FastAPI application — REST API for the knowledge system.
"""
from __future__ import annotations

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes import ingestion, insights, knowledge, sync

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Knowledge System API starting up")
    yield
    logger.info("Knowledge System API shutting down")


app = FastAPI(
    title="Knowledge Extraction System API",
    description="Centralized intelligence layer for your digital ecosystem",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(knowledge.router, prefix="/api/v1/knowledge", tags=["Knowledge"])
app.include_router(insights.router, prefix="/api/v1/insights", tags=["Insights"])
app.include_router(ingestion.router, prefix="/api/v1/ingest", tags=["Ingestion"])
app.include_router(sync.router, prefix="/api/v1/sync", tags=["Sync"])


@app.get("/health")
def health():
    return {"status": "ok", "service": "knowledge-system"}
