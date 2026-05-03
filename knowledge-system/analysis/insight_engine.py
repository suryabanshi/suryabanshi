"""
Insight Engine — analyzes the entire knowledge base and produces
actionable strategic insights using Claude.
"""
from __future__ import annotations

import json
import logging
from datetime import datetime, timezone
from typing import Optional

import anthropic

logger = logging.getLogger(__name__)

INSIGHT_PROMPT = """You are a strategic business analyst reviewing a personal knowledge base.

Based on the data below, generate high-value strategic insights.

KNOWLEDGE BASE SUMMARY:
{kb_summary}

TOP TOPICS (by frequency):
{top_topics}

RECENT KNOWLEDGE ITEMS:
{recent_items}

ACTIVE OPPORTUNITIES:
{opportunities}

Generate exactly 5 insights. Each insight MUST follow this JSON format:
[
  {{
    "title": "<short, punchy insight title>",
    "body": "<2-3 actionable sentences explaining the insight and what to do>",
    "insight_type": "<focus_area|gap|opportunity|pattern|warning>",
    "priority": "<low|medium|high|critical>",
    "action_required": true|false,
    "evidence_summary": "<which data points support this>"
  }}
]

Focus on:
1. What this person spends the most mental energy on (focus areas)
2. Obvious gaps they are missing (gap insights)
3. Monetizable opportunities they haven't acted on (opportunity)
4. Repeated patterns in their thinking (pattern)
5. Risks or wasted effort (warning)

Return ONLY the JSON array. No markdown, no explanation."""


class InsightEngine:
    """
    Generates AI-powered strategic insights from the knowledge base.

    Usage:
        engine = InsightEngine(db_client, api_key="...", model="claude-sonnet-4-6")
        count = engine.generate_insights()
    """

    def __init__(self, db_client, api_key: str, model: str = "claude-sonnet-4-6"):
        self.db = db_client
        self.client = anthropic.Anthropic(api_key=api_key)
        self.model = model

    def generate_insights(self, top_n: int = 5) -> int:
        context = self._build_context()
        if not context:
            logger.warning("Insufficient data to generate insights")
            return 0

        prompt = INSIGHT_PROMPT.format(**context)
        try:
            message = self.client.messages.create(
                model=self.model,
                max_tokens=2048,
                messages=[{"role": "user", "content": prompt}],
            )
            raw = message.content[0].text.strip()
            if raw.startswith("```"):
                raw = raw.split("```")[1].lstrip("json").strip()
            insights_data = json.loads(raw)
        except (json.JSONDecodeError, Exception) as exc:
            logger.error("Insight generation failed: %s", exc)
            return 0

        count = 0
        for item in insights_data[:top_n]:
            try:
                self.db.table("insights").insert({
                    "title": item.get("title", "Insight")[:500],
                    "body": item.get("body", ""),
                    "insight_type": item.get("insight_type", "focus_area"),
                    "priority": item.get("priority", "medium"),
                    "action_required": item.get("action_required", False),
                    "generated_at": datetime.now(timezone.utc).isoformat(),
                }).execute()
                count += 1
            except Exception as exc:  # noqa: BLE001
                logger.error("Failed to save insight: %s", exc)

        logger.info("Generated %d insights", count)
        return count

    def _build_context(self) -> Optional[dict]:
        # 1. Overall stats
        stats = self._get_stats()
        if stats["total_items"] < 5:
            return None

        kb_summary = (
            f"Total knowledge items: {stats['total_items']}\n"
            f"Categories breakdown: {json.dumps(stats['categories'])}\n"
            f"Total ideas: {stats['total_ideas']}\n"
            f"Total opportunities: {stats['total_opportunities']}\n"
            f"Date range: {stats['oldest']} to {stats['newest']}"
        )

        # 2. Top topics
        topics_res = self.db.table("knowledge_items").select("key_topics").limit(200).execute()
        topic_counts: dict[str, int] = {}
        for row in (topics_res.data or []):
            for t in (row.get("key_topics") or []):
                topic_counts[t] = topic_counts.get(t, 0) + 1
        top_topics = sorted(topic_counts.items(), key=lambda x: x[1], reverse=True)[:20]
        top_topics_str = ", ".join(f"{t} ({c})" for t, c in top_topics)

        # 3. Recent high-importance items
        recent_res = (
            self.db.table("knowledge_items")
            .select("title, summary, category, importance_score, key_topics")
            .order("importance_score", desc=True)
            .limit(10)
            .execute()
        )
        recent_items = json.dumps([
            {
                "title": r["title"],
                "summary": r["summary"][:200],
                "category": r["category"],
                "importance": r["importance_score"],
            }
            for r in (recent_res.data or [])
        ], indent=2)

        # 4. Active opportunities
        opp_res = (
            self.db.table("opportunities")
            .select("title, description, estimated_revenue_monthly, stage, confidence")
            .neq("stage", "abandoned")
            .order("confidence", desc=True)
            .limit(5)
            .execute()
        )
        opportunities = json.dumps([
            {
                "title": o["title"],
                "stage": o["stage"],
                "monthly_revenue_estimate": o.get("estimated_revenue_monthly"),
            }
            for o in (opp_res.data or [])
        ], indent=2)

        return {
            "kb_summary": kb_summary,
            "top_topics": top_topics_str,
            "recent_items": recent_items,
            "opportunities": opportunities,
        }

    def _get_stats(self) -> dict:
        total = self.db.table("knowledge_items").select("id", count="exact").execute()
        cats = self.db.table("knowledge_items").select("category").execute()
        ideas = self.db.table("ideas").select("id", count="exact").execute()
        opps = self.db.table("opportunities").select("id", count="exact").execute()
        dates = (
            self.db.table("knowledge_items")
            .select("created_at")
            .order("created_at")
            .limit(1)
            .execute()
        )
        recent = (
            self.db.table("knowledge_items")
            .select("created_at")
            .order("created_at", desc=True)
            .limit(1)
            .execute()
        )

        cat_counts: dict[str, int] = {}
        for row in (cats.data or []):
            c = row.get("category", "other")
            cat_counts[c] = cat_counts.get(c, 0) + 1

        return {
            "total_items": total.count or 0,
            "total_ideas": ideas.count or 0,
            "total_opportunities": opps.count or 0,
            "categories": cat_counts,
            "oldest": (dates.data or [{}])[0].get("created_at", "N/A"),
            "newest": (recent.data or [{}])[0].get("created_at", "N/A"),
        }
