"""
AI-powered knowledge extractor using Claude.
Takes raw text and returns structured knowledge: topics, ideas, entities,
business opportunities, problems, solutions, and importance score.
"""
from __future__ import annotations

import json
import logging
from dataclasses import dataclass, field
from typing import Optional

import anthropic

logger = logging.getLogger(__name__)

EXTRACTION_PROMPT = """You are a knowledge extraction engine. Analyze the following text and extract structured information.

Return ONLY a valid JSON object with exactly these fields:

{
  "title": "<concise descriptive title (max 100 chars)>",
  "summary": "<2-4 sentence summary capturing the essence>",
  "category": "<one of: business, idea, research, content, system, contact, opportunity, personal, finance, tech, other>",
  "subcategory": "<specific subcategory, e.g. 'SaaS', 'marketing', 'productivity'>",
  "key_topics": ["<topic1>", "<topic2>", ...],
  "key_entities": [
    {"name": "<entity>", "type": "<person|company|product|place|concept|technology>", "confidence": 0.9}
  ],
  "ideas": [
    {"title": "<idea title>", "description": "<1-2 sentences>", "viability": 0.7}
  ],
  "opportunities": [
    {"title": "<opportunity>", "description": "<how to monetize or leverage this>", "revenue_potential": "<low|medium|high>"}
  ],
  "problems": ["<problem identified>"],
  "solutions": ["<solution mentioned>"],
  "sentiment": "<positive|neutral|negative|mixed>",
  "importance_score": <float 0.0-1.0>,
  "tags": ["<tag1>", "<tag2>", ...]
}

Scoring guidelines for importance_score:
- 0.9–1.0: Highly actionable business insights, novel ideas with clear revenue path
- 0.7–0.9: Valuable knowledge, good ideas, useful references
- 0.5–0.7: Moderately useful information
- 0.3–0.5: General information, low immediate value
- 0.0–0.3: Noise, duplicates, trivial content

TEXT TO ANALYZE:
---
{content}
---"""


@dataclass
class ExtractionResult:
    title: str
    summary: str
    category: str
    subcategory: Optional[str]
    key_topics: list[str]
    key_entities: list[dict]
    ideas: list[dict]
    opportunities: list[dict]
    problems: list[str]
    solutions: list[str]
    sentiment: str
    importance_score: float
    tags: list[str]
    raw_doc_id: Optional[str] = None


class KnowledgeExtractor:
    """
    Calls Claude to extract structured knowledge from raw text.

    Usage:
        extractor = KnowledgeExtractor(api_key="sk-ant-...", model="claude-sonnet-4-6")
        result = extractor.extract(raw_content, raw_doc_id="uuid")
    """

    # Truncate to avoid hitting token limits (keep first + last for context)
    MAX_CONTENT_CHARS = 12_000

    def __init__(self, api_key: str, model: str = "claude-sonnet-4-6"):
        self.client = anthropic.Anthropic(api_key=api_key)
        self.model = model

    def extract(self, content: str, raw_doc_id: Optional[str] = None) -> Optional[ExtractionResult]:
        truncated = self._truncate(content)
        prompt = EXTRACTION_PROMPT.format(content=truncated)

        try:
            message = self.client.messages.create(
                model=self.model,
                max_tokens=2048,
                messages=[{"role": "user", "content": prompt}],
            )
            raw_json = message.content[0].text.strip()
            # Strip markdown code fences if present
            if raw_json.startswith("```"):
                raw_json = raw_json.split("```")[1]
                if raw_json.startswith("json"):
                    raw_json = raw_json[4:]
            data = json.loads(raw_json)
        except json.JSONDecodeError as exc:
            logger.error("JSON parse error for doc %s: %s", raw_doc_id, exc)
            return None
        except Exception as exc:  # noqa: BLE001
            logger.error("Extraction failed for doc %s: %s", raw_doc_id, exc)
            return None

        return ExtractionResult(
            title=data.get("title", "Untitled")[:500],
            summary=data.get("summary", ""),
            category=data.get("category", "other"),
            subcategory=data.get("subcategory"),
            key_topics=data.get("key_topics", [])[:20],
            key_entities=data.get("key_entities", [])[:30],
            ideas=data.get("ideas", []),
            opportunities=data.get("opportunities", []),
            problems=data.get("problems", []),
            solutions=data.get("solutions", []),
            sentiment=data.get("sentiment", "neutral"),
            importance_score=float(data.get("importance_score", 0.5)),
            tags=data.get("tags", [])[:30],
            raw_doc_id=raw_doc_id,
        )

    def extract_batch(
        self, items: list[tuple[str, str]]  # [(raw_doc_id, content), ...]
    ) -> list[ExtractionResult]:
        results = []
        for raw_doc_id, content in items:
            result = self.extract(content, raw_doc_id)
            if result:
                results.append(result)
        return results

    def _truncate(self, text: str) -> str:
        if len(text) <= self.MAX_CONTENT_CHARS:
            return text
        half = self.MAX_CONTENT_CHARS // 2
        return text[:half] + "\n\n[... content truncated ...]\n\n" + text[-half:]
