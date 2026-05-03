"""
Dropbox connector — lists and downloads files from a Dropbox account.
Uses the Dropbox SDK with long-poll (cursor-based) incremental sync.
"""
from __future__ import annotations

from datetime import timezone
from typing import Iterator, Optional

from ingestion.connectors.file_processor import (
    SUPPORTED_EXTENSIONS,
    LocalFileConnector,
    RawDocument,
    sha256,
)

try:
    import dropbox
    from dropbox.files import FileMetadata
    HAS_DROPBOX = True
except ImportError:
    HAS_DROPBOX = False


class DropboxConnector:
    """
    Yields RawDocument for every supported file in the Dropbox account.
    Stores cursor for future incremental syncs.

    Usage:
        connector = DropboxConnector(access_token="...", cursor=saved_cursor)
        for doc in connector.extract():
            ingest(doc)
        # Save connector.cursor for next run
    """

    def __init__(self, access_token: str, cursor: Optional[str] = None, path: str = ""):
        if not HAS_DROPBOX:
            raise ImportError("dropbox not installed.\nRun: pip install dropbox")
        self.dbx = dropbox.Dropbox(access_token)
        self.cursor = cursor
        self.path = path  # "" = root

    def extract(self) -> Iterator[RawDocument]:
        if self.cursor:
            yield from self._incremental()
        else:
            yield from self._full_sync()

    def _full_sync(self) -> Iterator[RawDocument]:
        result = self.dbx.files_list_folder(self.path, recursive=True)
        while True:
            for entry in result.entries:
                doc = self._fetch_entry(entry)
                if doc:
                    yield doc
            if not result.has_more:
                self.cursor = result.cursor
                break
            result = self.dbx.files_list_folder_continue(result.cursor)

    def _incremental(self) -> Iterator[RawDocument]:
        result = self.dbx.files_list_folder_continue(self.cursor)
        while True:
            for entry in result.entries:
                doc = self._fetch_entry(entry)
                if doc:
                    yield doc
            if not result.has_more:
                self.cursor = result.cursor
                break
            result = self.dbx.files_list_folder_continue(result.cursor)

    def _fetch_entry(self, entry) -> Optional[RawDocument]:
        if not isinstance(entry, FileMetadata):
            return None
        ext = "." + entry.path_lower.rsplit(".", 1)[-1] if "." in entry.path_lower else ""
        if ext not in SUPPORTED_EXTENSIONS:
            return None
        try:
            _, response = self.dbx.files_download(entry.path_lower)
            raw_bytes = response.content
            content = raw_bytes.decode("utf-8", errors="replace")
            if not content.strip():
                return None
            modified = entry.server_modified.replace(tzinfo=timezone.utc) if entry.server_modified else None
            return RawDocument(
                title=entry.name,
                raw_content=content,
                content_hash=sha256(content),
                mime_type="text/plain",
                file_size_bytes=entry.size,
                source_url=f"dropbox://{entry.path_lower}",
                source_metadata={
                    "dropbox_path": entry.path_lower,
                    "rev": entry.rev,
                    "server_modified": entry.server_modified.isoformat() if entry.server_modified else None,
                },
                created_at_source=modified,
                external_id=entry.id,
            )
        except Exception as exc:  # noqa: BLE001
            print(f"[Dropbox] Skipping {entry.path_lower}: {exc}")
            return None
