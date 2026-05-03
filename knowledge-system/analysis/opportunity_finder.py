"""
Opportunity Finder — mines the knowledge base for monetizable opportunities.
Scores, ranks, and generates action plans using Claude.
"""
from __future__ import annotations

import json
import logging
from datetime import datetime, timezone
from typing import Optional

import anthropic

logger = logging.getLogger(__name__)

OPPORTUNITY_ANALYSIS_PROMPT = """You are a startup strategist and revenue growth expert.

Analyze these raw opportunity seeds from a personal knowledge base and produce a ranked list of the most monetizable opportunities.

RAW OPPORTUNITIES:
{raw_opportunities}

TOP IDEAS:
{top_ideas}

SKILL/TOPIC SIGNALS (what the person knows deeply):
{skill_signals}

For each opportunity, provide a business-quality evaluation:

Return a JSON array:
[
  {{
    "title": "<opportunity title>",
    "category": "<SaaS|freelance|content|info-product|agency|marketplace|tool|other>",
    "one_liner": "<one sentence pitch>",
    "problem": "<what problem does this solve?>",
    "target_customer": "<who pays for this?>",
    "revenue_model": "<how does money flow? subscription/one-time/services/ads>",
    "estimated_monthly_revenue": <realistic monthly USD, e.g. 2000>,
    "estimated_effort_days": <days to first revenue, e.g. 30>,
    "roi_score": <estimated_monthly_revenue * 12 / estimated_effort_days>,
    "confidence": <0.0-1.0>,
    "next_action": "<single most important next step — be specific>",
    "risks": ["<risk1>", "<risk2>"],
    "validated_signals": ["<evidence from the knowledge base>"]
  }}
]

Rank by roi_score descending. Return top 5. Return ONLY the JSON array."""


class OpportunityFinder:
    """
    Synthesizes ideas and knowledge items into ranked, actionable business opportunities.

    Usage:
        finder = OpportunityFinder(db_client, api_key="...", model="claude-sonnet-4-6")
        opportunities = finder.find_and_rank()
    """

    def __init__(self, db_client, api_key: str, model: str = "claude-sonnet-4-6"):
        self.db = db_client
        self.client = anthropic.Anthropic(api_key=api_key)
        self.model = model

    def find_and_rank(self) -> list[dict]:
        """Returns top opportunities with full analysis and saves to DB."""
        context = self._gather_context()
        if not context:
            return []

        prompt = OPPORTUNITY_ANALYSIS_PROMPT.format(**context)
        try:
            message = self.client.messages.create(
                model=self.model,
                max_tokens=3000,
                messages=[{"role": "user", "content": prompt}],
            )
            raw = message.content[0].text.strip()
            if raw.startswith("```"):
                raw = raw.split("```")[1].lstrip("json").strip()
            opportunities = json.loads(raw)
        except (json.JSONDecodeError, Exception) as exc:
            logger.error("Opportunity analysis failed: %s", exc)
            return []

        results = []
        for opp in opportunities:
            saved = self._save_opportunity(opp)
            if saved:
                results.append({**opp, "id": saved})

        logger.info("Found and saved %d opportunities", len(results))
        return results

    def get_ranked_pipeline(self) -> list[dict]:
        """Returns existing opportunities ranked by ROI score."""
        res = (
            self.db.table("v_opportunity_pipeline")
            .select("*")
            .limit(20)
            .execute()
        )
        return res.data or []

    def score_opportunity(self, opp_id: str) -> Optional[float]:
        """Recalculates ROI score for a specific opportunity."""
        res = self.db.table("opportunities").select(
            "estimated_revenue_monthly, estimated_effort_days"
        ).eq("id", opp_id).single().execute()
        if not res.data:
            return None
        rev = res.data.get("estimated_revenue_monthly") or 0
        effort = res.data.get("estimated_effort_days") or 1
        roi = float(rev) * 12 / float(effort)
        self.db.table("opportunities").update({"roi_score": roi}).eq("id", opp_id).execute()
        return roi

    def generate_action_plan(self, opp_id: str) -> list[dict]:
        """Uses Claude to generate a step-by-step action plan for an opportunity."""
        res = self.db.table("opportunities").select("*").eq("id", opp_id).single().execute()
        if not res.data:
            return []
        opp = res.data

        prompt = f"""Create a 7-step action plan to turn this opportunity into revenue within 30 days.

Opportunity: {opp['title']}
Description: {opp['description']}
Revenue estimate: ${opp.get('estimated_revenue_monthly', 0)}/month

Return JSON array: [{{"step": 1, "action": "...", "deadline_days": 3, "output": "what you'll have when done"}}]
Return ONLY the JSON array."""

        try:
            message = self.client.messages.create(
                model=self.model,
                max_tokens=1024,
                messages=[{"role": "user", "content": prompt}],
            )
            raw = message.content[0].text.strip()
            if raw.startswith("```"):
                raw = raw.split("```")[1].lstrip("json").strip()
            plan = json.loads(raw)
        except Exception as exc:  # noqa: BLE001
            logger.error("Action plan generation failed: %s", exc)
            return []

        self.db.table("opportunities").update({"action_items": plan}).eq("id", opp_id).execute()
        return plan

    def _gather_context(self) -> Optional[dict]:
        # Raw opportunities from extraction
        raw_opps = (
            self.db.table("opportunities")
            .select("title, description, estimated_revenue_monthly, stage")
            .eq("stage", "discovered")
            .limit(30)
            .execute()
            .data or []
        )
        if not raw_opps:
            logger.info("No discovered opportunities to analyze")
            return None

        # High-viability ideas
        ideas_res = (
            self.db.table("ideas")
            .select("title, description, viability_score, potential_value")
            .order("viability_score", desc=True)
            .limit(10)
            .execute()
            .data or []
        )

        # Skill signals from top topics
        topics_res = self.db.table("knowledge_items").select("key_topics").limit(100).execute()
        topic_counts: dict[str, int] = {}
        for row in (topics_res.data or []):
            for t in (row.get("key_topics") or []):
                topic_counts[t] = topic_counts.get(t, 0) + 1
        skill_signals = sorted(topic_counts.items(), key=lambda x: x[1], reverse=True)[:15]

        return {
            "raw_opportunities": json.dumps(raw_opps, indent=2),
            "top_ideas": json.dumps(ideas_res, indent=2),
            "skill_signals": ", ".join(f"{t} ({c}x)" for t, c in skill_signals),
        }

    def _save_opportunity(self, opp: dict) -> Optional[str]:
        try:
            rev = float(opp.get("estimated_monthly_revenue", 0))
            effort = int(opp.get("estimated_effort_days", 30))
            roi = rev * 12 / max(effort, 1)
            res = self.db.table("opportunities").insert({
                "title": opp.get("title", "")[:500],
                "description": (
                    f"{opp.get('one_liner', '')}\n\n"
                    f"Problem: {opp.get('problem', '')}\n"
                    f"Target: {opp.get('target_customer', '')}\n"
                    f"Revenue model: {opp.get('revenue_model', '')}\n"
                    f"Next action: {opp.get('next_action', '')}"
                ),
                "category": opp.get("category"),
                "estimated_revenue_monthly": rev,
                "estimated_effort_days": effort,
                "roi_score": roi,
                "confidence": float(opp.get("confidence", 0.5)),
                "action_items": [
                    {"task": opp.get("next_action", ""), "done": False}
                ],
                "stage": "validated",
            }).execute()
            rows = res.data or []
            return rows[0]["id"] if rows else None
        except Exception as exc:  # noqa: BLE001
            logger.error("Failed to save opportunity '%s': %s", opp.get("title"), exc)
            return None
