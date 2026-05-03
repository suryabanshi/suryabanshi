"""
Chat history connector.
Handles exported conversation files from ChatGPT, Claude, and generic JSON/text formats.

Supported import formats:
  - ChatGPT export (conversations.json)
  - Claude export (conversations.json)
  - Generic JSONL conversation format
  - Plain text chat logs
"""
from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterator, Optional

from ingestion.connectors.file_processor import RawDocument, sha256


class ChatHistoryConnector:
    """
    Parses exported chat history files and yields one RawDocument per conversation.

    Usage:
        connector = ChatHistoryConnector("/path/to/conversations.json", platform="chatgpt")
        for doc in connector.extract():
            ingest(doc)
    """

    SUPPORTED_PLATFORMS = ("chatgpt", "claude", "generic_jsonl", "text")

    def __init__(self, file_path: str, platform: str = "chatgpt"):
        self.path = Path(file_path)
        if platform not in self.SUPPORTED_PLATFORMS:
            raise ValueError(f"Unknown platform '{platform}'. Choose from {self.SUPPORTED_PLATFORMS}")
        self.platform = platform

    def extract(self) -> Iterator[RawDocument]:
        if self.platform == "chatgpt":
            yield from self._parse_chatgpt()
        elif self.platform == "claude":
            yield from self._parse_claude()
        elif self.platform == "generic_jsonl":
            yield from self._parse_jsonl()
        else:
            yield from self._parse_text()

    # ── ChatGPT export format ─────────────────────────────────────────────────

    def _parse_chatgpt(self) -> Iterator[RawDocument]:
        data = json.loads(self.path.read_text(encoding="utf-8"))
        for convo in data:
            content = self._flatten_chatgpt(convo)
            if not content.strip():
                continue
            title = convo.get("title", "Untitled Conversation")
            created_at = _epoch_to_dt(convo.get("create_time"))
            yield RawDocument(
                title=f"[ChatGPT] {title}",
                raw_content=content,
                content_hash=sha256(content),
                mime_type="text/plain",
                file_size_bytes=len(content.encode()),
                source_url=f"chatgpt://conversation/{convo.get('id', '')}",
                source_metadata={
                    "platform": "chatgpt",
                    "conversation_id": convo.get("id"),
                    "created_time": convo.get("create_time"),
                },
                created_at_source=created_at,
                external_id=convo.get("id"),
            )

    @staticmethod
    def _flatten_chatgpt(convo: dict) -> str:
        lines: list[str] = []
        mapping = convo.get("mapping", {})
        for node in mapping.values():
            msg = node.get("message")
            if not msg:
                continue
            role = msg.get("author", {}).get("role", "unknown")
            parts = msg.get("content", {}).get("parts", [])
            text = " ".join(str(p) for p in parts if isinstance(p, str)).strip()
            if text:
                lines.append(f"[{role.upper()}]: {text}")
        return "\n\n".join(lines)

    # ── Claude export format ──────────────────────────────────────────────────

    def _parse_claude(self) -> Iterator[RawDocument]:
        data = json.loads(self.path.read_text(encoding="utf-8"))
        convos = data if isinstance(data, list) else data.get("conversations", [])
        for convo in convos:
            messages = convo.get("messages", [])
            lines = []
            for msg in messages:
                role = msg.get("role", "unknown")
                text = msg.get("content", "")
                if isinstance(text, list):
                    text = " ".join(
                        b.get("text", "") for b in text if isinstance(b, dict)
                    )
                if text.strip():
                    lines.append(f"[{role.upper()}]: {text.strip()}")
            content = "\n\n".join(lines)
            if not content.strip():
                continue
            title = convo.get("name") or convo.get("title") or "Untitled"
            created_at = _iso_to_dt(convo.get("created_at"))
            yield RawDocument(
                title=f"[Claude] {title}",
                raw_content=content,
                content_hash=sha256(content),
                mime_type="text/plain",
                file_size_bytes=len(content.encode()),
                source_url=f"claude://conversation/{convo.get('uuid', '')}",
                source_metadata={
                    "platform": "claude",
                    "conversation_id": convo.get("uuid"),
                    "created_at": convo.get("created_at"),
                },
                created_at_source=created_at,
                external_id=convo.get("uuid"),
            )

    # ── Generic JSONL ─────────────────────────────────────────────────────────

    def _parse_jsonl(self) -> Iterator[RawDocument]:
        for line in self.path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line:
                continue
            try:
                obj = json.loads(line)
            except json.JSONDecodeError:
                continue
            content = obj.get("content") or obj.get("text") or json.dumps(obj)
            title = obj.get("title") or obj.get("id") or "JSONL record"
            yield RawDocument(
                title=str(title),
                raw_content=content,
                content_hash=sha256(content),
                mime_type="application/json",
                file_size_bytes=len(content.encode()),
                source_url=str(self.path),
                source_metadata={"platform": "generic_jsonl"},
                external_id=str(obj.get("id", sha256(content)[:8])),
            )

    # ── Plain text ────────────────────────────────────────────────────────────

    def _parse_text(self) -> Iterator[RawDocument]:
        content = self.path.read_text(encoding="utf-8", errors="replace")
        if not content.strip():
            return
        yield RawDocument(
            title=self.path.stem,
            raw_content=content,
            content_hash=sha256(content),
            mime_type="text/plain",
            file_size_bytes=len(content.encode()),
            source_url=str(self.path.resolve()),
            source_metadata={"platform": "text"},
        )


# ── helpers ───────────────────────────────────────────────────────────────────

def _epoch_to_dt(ts) -> Optional[datetime]:
    if ts is None:
        return None
    try:
        return datetime.fromtimestamp(float(ts), tz=timezone.utc)
    except (TypeError, ValueError):
        return None


def _iso_to_dt(s) -> Optional[datetime]:
    if not s:
        return None
    try:
        return datetime.fromisoformat(str(s).replace("Z", "+00:00"))
    except ValueError:
        return None
