"""FastAPI dependency providers."""
from __future__ import annotations

from functools import lru_cache

from config.settings import settings as _settings


@lru_cache(maxsize=1)
def _get_db_client():
    from supabase import create_client
    return create_client(_settings.supabase_url, _settings.supabase_service_key)


def get_db():
    return _get_db_client()


def get_settings():
    return _settings
