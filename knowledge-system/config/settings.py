"""Central configuration — reads from environment variables."""
from __future__ import annotations

import os
from dataclasses import dataclass, field
from typing import Optional


@dataclass
class Settings:
    # ── Supabase ──────────────────────────────────────────────────────────────
    supabase_url: str = field(default_factory=lambda: os.environ["SUPABASE_URL"])
    supabase_service_key: str = field(default_factory=lambda: os.environ["SUPABASE_SERVICE_KEY"])
    supabase_anon_key: str = field(default_factory=lambda: os.getenv("SUPABASE_ANON_KEY", ""))

    # ── Anthropic (Claude) ────────────────────────────────────────────────────
    anthropic_api_key: str = field(default_factory=lambda: os.environ["ANTHROPIC_API_KEY"])
    claude_model: str = field(default_factory=lambda: os.getenv("CLAUDE_MODEL", "claude-sonnet-4-6"))
    claude_max_tokens: int = field(default_factory=lambda: int(os.getenv("CLAUDE_MAX_TOKENS", "4096")))

    # ── Google Drive ──────────────────────────────────────────────────────────
    google_credentials_file: str = field(
        default_factory=lambda: os.getenv("GOOGLE_CREDENTIALS_FILE", "credentials/google_service_account.json")
    )
    google_drive_folder_id: Optional[str] = field(
        default_factory=lambda: os.getenv("GOOGLE_DRIVE_FOLDER_ID")
    )

    # ── Dropbox ───────────────────────────────────────────────────────────────
    dropbox_access_token: Optional[str] = field(
        default_factory=lambda: os.getenv("DROPBOX_ACCESS_TOKEN")
    )

    # ── Notion ────────────────────────────────────────────────────────────────
    notion_api_key: Optional[str] = field(
        default_factory=lambda: os.getenv("NOTION_API_KEY")
    )
    notion_database_ids: list[str] = field(
        default_factory=lambda: [
            x for x in os.getenv("NOTION_DATABASE_IDS", "").split(",") if x
        ]
    )

    # ── GitHub ────────────────────────────────────────────────────────────────
    github_token: Optional[str] = field(
        default_factory=lambda: os.getenv("GITHUB_TOKEN")
    )
    github_username: Optional[str] = field(
        default_factory=lambda: os.getenv("GITHUB_USERNAME")
    )

    # ── Processing ────────────────────────────────────────────────────────────
    batch_size: int = field(default_factory=lambda: int(os.getenv("BATCH_SIZE", "20")))
    embedding_model: str = field(
        default_factory=lambda: os.getenv("EMBEDDING_MODEL", "text-embedding-3-small")
    )
    # Similarity threshold for deduplication (0.0 – 1.0)
    dedup_threshold: float = field(
        default_factory=lambda: float(os.getenv("DEDUP_THRESHOLD", "0.92"))
    )

    # ── Scheduler ────────────────────────────────────────────────────────────
    sync_interval_minutes: int = field(
        default_factory=lambda: int(os.getenv("SYNC_INTERVAL_MINUTES", "60"))
    )
    insight_refresh_hours: int = field(
        default_factory=lambda: int(os.getenv("INSIGHT_REFRESH_HOURS", "24"))
    )

    # ── API ───────────────────────────────────────────────────────────────────
    api_host: str = field(default_factory=lambda: os.getenv("API_HOST", "0.0.0.0"))
    api_port: int = field(default_factory=lambda: int(os.getenv("API_PORT", "8000")))
    api_secret_key: str = field(
        default_factory=lambda: os.environ.get("API_SECRET_KEY", "change-me-in-production")
    )
    cors_origins: list[str] = field(
        default_factory=lambda: os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
    )


# Module-level singleton — import this everywhere
settings = Settings()
