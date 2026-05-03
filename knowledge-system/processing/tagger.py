"""
Auto-tagging system.
Creates and assigns tags (multi-layer: topic, domain, status, priority)
based on extracted data. Uses both rule-based and AI-assisted tagging.
"""
from __future__ import annotations

import re
import logging
from typing import Optional

from processing.extractor import ExtractionResult

logger = logging.getLogger(__name__)

# ── Static taxonomy — rules applied before AI ─────────────────────────────────
DOMAIN_RULES: dict[str, list[str]] = {
    "ai-ml": ["machine learning", "deep learning", "neural", "llm", "gpt", "claude", "openai",
               "transformer", "embedding", "vector", "nlp", "computer vision"],
    "saas": ["saas", "software as a service", "subscription", "mrr", "arr", "churn", "b2b", "b2c"],
    "ecommerce": ["shopify", "woocommerce", "dropshipping", "amazon fba", "product listing",
                  "e-commerce", "online store"],
    "content-creation": ["youtube", "newsletter", "blog", "podcast", "substack", "twitter thread",
                         "viral", "content strategy"],
    "no-code": ["no-code", "low-code", "bubble", "webflow", "zapier", "make.com", "airtable", "notion"],
    "freelance": ["freelance", "client", "proposal", "invoice", "upwork", "fiverr", "agency"],
    "investing": ["stock", "crypto", "nft", "defi", "portfolio", "roi", "dividend", "etf"],
    "productivity": ["productivity", "workflow", "automation", "system", "pkm", "second brain",
                     "obsidian", "notion", "time management"],
    "marketing": ["seo", "funnel", "conversion", "email marketing", "cold email", "ads",
                  "facebook ads", "google ads", "copywriting"],
    "startup": ["startup", "mvp", "product market fit", "fundraising", "pitch deck", "vc",
                "venture capital", "bootstrap", "solopreneur"],
}

PRIORITY_RULES = {
    "high-priority": ["urgent", "immediately", "asap", "critical", "must", "important", "priority"],
    "quick-win": ["easy", "simple", "quick", "low effort", "low-hanging fruit", "fast"],
    "long-term": ["long term", "future", "eventually", "phase 2", "roadmap", "vision"],
}


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    return re.sub(r"[\s-]+", "-", text)


class AutoTagger:
    """
    Generates a final tag list for a knowledge item.

    Usage:
        tagger = AutoTagger(db_client)
        tags = tagger.generate_tags(extraction_result)
        # Returns: [{"name": "ai-ml", "layer": "domain", "is_auto": True, "confidence": 0.9}, ...]
    """

    def __init__(self, db_client=None):
        self.db = db_client  # Optional Supabase client for tag persistence

    def generate_tags(self, result: ExtractionResult) -> list[dict]:
        tags: list[dict] = []
        combined_text = (
            f"{result.title} {result.summary} "
            f"{' '.join(result.key_topics)} "
            f"{' '.join(result.tags)}"
        ).lower()

        # 1. AI-extracted tags (highest confidence)
        for tag_name in result.tags:
            tags.append({
                "name": tag_name.lower().strip(),
                "slug": slugify(tag_name),
                "layer": "topic",
                "is_auto": True,
                "confidence": 0.85,
            })

        # 2. Category tag
        tags.append({
            "name": result.category,
            "slug": result.category,
            "layer": "category",
            "is_auto": True,
            "confidence": 1.0,
        })

        # 3. Domain tags via keyword rules
        for domain, keywords in DOMAIN_RULES.items():
            hits = sum(1 for kw in keywords if kw in combined_text)
            if hits >= 2:
                tags.append({
                    "name": domain,
                    "slug": domain,
                    "layer": "domain",
                    "is_auto": True,
                    "confidence": min(0.6 + hits * 0.05, 0.95),
                })

        # 4. Priority / urgency tags
        for priority_tag, keywords in PRIORITY_RULES.items():
            if any(kw in combined_text for kw in keywords):
                tags.append({
                    "name": priority_tag,
                    "slug": priority_tag,
                    "layer": "priority",
                    "is_auto": True,
                    "confidence": 0.75,
                })

        # 5. Importance-based tags
        if result.importance_score >= 0.85:
            tags.append({
                "name": "top-insight",
                "slug": "top-insight",
                "layer": "status",
                "is_auto": True,
                "confidence": 1.0,
            })
        if result.opportunities:
            tags.append({
                "name": "has-opportunity",
                "slug": "has-opportunity",
                "layer": "status",
                "is_auto": True,
                "confidence": 0.9,
            })
        if result.ideas:
            tags.append({
                "name": "has-idea",
                "slug": "has-idea",
                "layer": "status",
                "is_auto": True,
                "confidence": 0.9,
            })

        # Deduplicate by slug
        seen: set[str] = set()
        unique: list[dict] = []
        for tag in tags:
            slug = tag["slug"]
            if slug and slug not in seen:
                seen.add(slug)
                unique.append(tag)

        return unique

    def upsert_tags(self, tags: list[dict]) -> dict[str, str]:
        """
        Ensures tags exist in the database.
        Returns mapping {slug: tag_id}.
        """
        if not self.db:
            return {}
        slug_to_id: dict[str, str] = {}
        for tag in tags:
            try:
                res = (
                    self.db.table("tags")
                    .upsert(
                        {
                            "name": tag["name"],
                            "slug": tag["slug"],
                            "layer": tag["layer"],
                        },
                        on_conflict="slug",
                    )
                    .execute()
                )
                if res.data:
                    slug_to_id[tag["slug"]] = res.data[0]["id"]
            except Exception as exc:  # noqa: BLE001
                logger.warning("Tag upsert failed for '%s': %s", tag["name"], exc)
        return slug_to_id

    def assign_tags(
        self,
        knowledge_item_id: str,
        tags: list[dict],
        slug_to_id: dict[str, str],
    ) -> None:
        if not self.db:
            return
        rows = []
        for tag in tags:
            tag_id = slug_to_id.get(tag["slug"])
            if not tag_id:
                continue
            rows.append({
                "knowledge_item_id": knowledge_item_id,
                "tag_id": tag_id,
                "confidence": tag.get("confidence", 1.0),
                "is_auto_tagged": tag.get("is_auto", False),
            })
        if rows:
            try:
                self.db.table("knowledge_item_tags").upsert(
                    rows, on_conflict="knowledge_item_id,tag_id"
                ).execute()
            except Exception as exc:  # noqa: BLE001
                logger.warning("Tag assignment failed for item %s: %s", knowledge_item_id, exc)
