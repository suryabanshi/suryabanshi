"""
Google Drive connector.
Uses service account credentials. Supports incremental sync via page tokens.
Extracts: Google Docs, Sheets, PDFs, plain text, Markdown.
"""
from __future__ import annotations

import io
from datetime import datetime, timezone
from typing import Iterator, Optional

from ingestion.connectors.file_processor import RawDocument, sha256

try:
    from google.oauth2 import service_account
    from googleapiclient.discovery import build
    from googleapiclient.http import MediaIoBaseDownload
    HAS_GOOGLE = True
except ImportError:
    HAS_GOOGLE = False

SCOPES = ["https://www.googleapis.com/auth/drive.readonly"]

# MIME types we can handle + how to export them
EXPORTABLE = {
    "application/vnd.google-apps.document": ("text/plain", ".txt"),
    "application/vnd.google-apps.spreadsheet": ("text/csv", ".csv"),
    "application/vnd.google-apps.presentation": ("text/plain", ".txt"),
}
DOWNLOADABLE_MIMES = {
    "application/pdf",
    "text/plain",
    "text/markdown",
    "text/csv",
    "application/json",
}


class GoogleDriveConnector:
    """
    Yields RawDocument for every supported file in the specified folder
    (default: entire Drive).

    Usage:
        connector = GoogleDriveConnector(
            credentials_file="credentials/google_service_account.json",
            folder_id="<optional-folder-id>",
            page_token=None,         # pass saved cursor for incremental sync
        )
        docs, next_token = connector.extract()
    """

    def __init__(
        self,
        credentials_file: str,
        folder_id: Optional[str] = None,
        page_token: Optional[str] = None,
    ):
        if not HAS_GOOGLE:
            raise ImportError(
                "google-api-python-client not installed.\n"
                "Run: pip install google-api-python-client google-auth"
            )
        creds = service_account.Credentials.from_service_account_file(
            credentials_file, scopes=SCOPES
        )
        self.service = build("drive", "v3", credentials=creds, cache_discovery=False)
        self.folder_id = folder_id
        self.page_token = page_token

    def extract(self) -> tuple[list[RawDocument], Optional[str]]:
        docs: list[RawDocument] = []
        query_parts = ["trashed = false"]
        if self.folder_id:
            query_parts.append(f"'{self.folder_id}' in parents")

        request = self.service.files().list(
            q=" and ".join(query_parts),
            spaces="drive",
            fields="nextPageToken, files(id,name,mimeType,size,modifiedTime,webViewLink)",
            pageSize=100,
            pageToken=self.page_token,
        )
        response = request.execute()
        new_token = response.get("nextPageToken")

        for file_meta in response.get("files", []):
            doc = self._fetch_file(file_meta)
            if doc:
                docs.append(doc)

        return docs, new_token

    def _fetch_file(self, meta: dict) -> Optional[RawDocument]:
        mime = meta["mimeType"]
        file_id = meta["id"]

        try:
            if mime in EXPORTABLE:
                export_mime, ext = EXPORTABLE[mime]
                content = self._export(file_id, export_mime)
            elif mime in DOWNLOADABLE_MIMES:
                content = self._download(file_id)
            else:
                return None
        except Exception as exc:  # noqa: BLE001
            print(f"[GoogleDrive] Skipping {meta['name']}: {exc}")
            return None

        if not content.strip():
            return None

        modified = datetime.fromisoformat(
            meta.get("modifiedTime", "").replace("Z", "+00:00")
        ) if meta.get("modifiedTime") else None

        return RawDocument(
            title=meta["name"],
            raw_content=content,
            content_hash=sha256(content),
            mime_type=mime,
            file_size_bytes=int(meta.get("size", 0)),
            source_url=meta.get("webViewLink", f"https://drive.google.com/file/d/{file_id}"),
            source_metadata={
                "drive_file_id": file_id,
                "mime_type": mime,
                "modified_time": meta.get("modifiedTime"),
            },
            created_at_source=modified,
            external_id=file_id,
        )

    def _export(self, file_id: str, mime: str) -> str:
        buf = io.BytesIO()
        request = self.service.files().export_media(fileId=file_id, mimeType=mime)
        downloader = MediaIoBaseDownload(buf, request)
        done = False
        while not done:
            _, done = downloader.next_chunk()
        return buf.getvalue().decode("utf-8", errors="replace")

    def _download(self, file_id: str) -> str:
        buf = io.BytesIO()
        request = self.service.files().get_media(fileId=file_id)
        downloader = MediaIoBaseDownload(buf, request)
        done = False
        while not done:
            _, done = downloader.next_chunk()
        return buf.getvalue().decode("utf-8", errors="replace")
