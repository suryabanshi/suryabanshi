"""
Notion connector.
Pulls pages and databases using the Notion API v1.
Converts Notion block structure to plain text for processing.
"""
from __future__ import annotations

from datetime import datetime, timezone
from typing import Iterator, Optional

from ingestion.connectors.file_processor import RawDocument, sha256

try:
    from notion_client import Client as NotionClient
    HAS_NOTION = True
except ImportError:
    HAS_NOTION = False


class NotionConnector:
    """
    Extracts all pages from specified Notion databases.

    Usage:
        connector = NotionConnector(
            api_key="secret_xxx",
            database_ids=["db-id-1", "db-id-2"],
        )
        for doc in connector.extract():
            ingest(doc)
    """

    def __init__(self, api_key: str, database_ids: list[str]):
        if not HAS_NOTION:
            raise ImportError(
                "notion-client not installed.\nRun: pip install notion-client"
            )
        self.client = NotionClient(auth=api_key)
        self.database_ids = database_ids

    def extract(self) -> Iterator[RawDocument]:
        for db_id in self.database_ids:
            yield from self._pull_database(db_id)

    def _pull_database(self, db_id: str) -> Iterator[RawDocument]:
        cursor = None
        while True:
            kwargs: dict = {"database_id": db_id, "page_size": 100}
            if cursor:
                kwargs["start_cursor"] = cursor
            response = self.client.databases.query(**kwargs)

            for page in response.get("results", []):
                doc = self._page_to_doc(page, db_id)
                if doc:
                    yield doc

            if not response.get("has_more"):
                break
            cursor = response.get("next_cursor")

    def _page_to_doc(self, page: dict, db_id: str) -> Optional[RawDocument]:
        page_id = page["id"]
        title = self._extract_title(page)
        content_lines = [f"# {title}\n"]
        content_lines += self._extract_blocks(page_id)
        content = "\n".join(content_lines)

        if not content.strip() or content.strip() == f"# {title}":
            return None

        last_edited = page.get("last_edited_time")
        modified = (
            datetime.fromisoformat(last_edited.replace("Z", "+00:00"))
            if last_edited else None
        )

        return RawDocument(
            title=title or page_id,
            raw_content=content,
            content_hash=sha256(content),
            mime_type="text/plain",
            file_size_bytes=len(content.encode()),
            source_url=page.get("url", ""),
            source_metadata={
                "notion_page_id": page_id,
                "notion_database_id": db_id,
                "last_edited": last_edited,
                "created_time": page.get("created_time"),
            },
            created_at_source=modified,
            external_id=page_id,
        )

    def _extract_title(self, page: dict) -> str:
        props = page.get("properties", {})
        for prop in props.values():
            if prop.get("type") == "title":
                parts = prop.get("title", [])
                return "".join(p.get("plain_text", "") for p in parts)
        return "Untitled"

    def _extract_blocks(self, page_id: str, indent: int = 0) -> list[str]:
        lines: list[str] = []
        cursor = None
        while True:
            kwargs: dict = {"block_id": page_id, "page_size": 100}
            if cursor:
                kwargs["start_cursor"] = cursor
            response = self.client.blocks.children.list(**kwargs)

            for block in response.get("results", []):
                lines += self._render_block(block, indent)

            if not response.get("has_more"):
                break
            cursor = response.get("next_cursor")
        return lines

    def _render_block(self, block: dict, indent: int) -> list[str]:
        btype = block.get("type", "")
        data = block.get(btype, {})
        prefix = "  " * indent
        lines: list[str] = []

        def rich_text(rt_list: list) -> str:
            return "".join(r.get("plain_text", "") for r in rt_list)

        text_blocks = {
            "paragraph": "", "heading_1": "# ", "heading_2": "## ",
            "heading_3": "### ", "quote": "> ", "callout": "💡 ",
        }
        if btype in text_blocks:
            t = rich_text(data.get("rich_text", []))
            if t.strip():
                lines.append(f"{prefix}{text_blocks[btype]}{t}")
        elif btype == "bulleted_list_item":
            t = rich_text(data.get("rich_text", []))
            lines.append(f"{prefix}- {t}")
        elif btype == "numbered_list_item":
            t = rich_text(data.get("rich_text", []))
            lines.append(f"{prefix}1. {t}")
        elif btype == "to_do":
            t = rich_text(data.get("rich_text", []))
            done = "x" if data.get("checked") else " "
            lines.append(f"{prefix}- [{done}] {t}")
        elif btype == "code":
            lang = data.get("language", "")
            t = rich_text(data.get("rich_text", []))
            lines += [f"```{lang}", t, "```"]
        elif btype == "divider":
            lines.append("---")

        # Recurse into children
        if block.get("has_children"):
            lines += self._extract_blocks(block["id"], indent + 1)

        return lines
