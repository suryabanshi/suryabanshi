"""
GitHub connector — extracts READMEs, issues, and gists as knowledge items.
"""
from __future__ import annotations

from typing import Iterator, Optional

from ingestion.connectors.file_processor import RawDocument, sha256

try:
    from github import Github, GithubException
    HAS_GITHUB = True
except ImportError:
    HAS_GITHUB = False


class GitHubConnector:
    """
    Pulls repositories, issues, and gists for a given user.

    Usage:
        connector = GitHubConnector(token="ghp_xxx", username="you")
        for doc in connector.extract():
            ingest(doc)
    """

    def __init__(self, token: str, username: str):
        if not HAS_GITHUB:
            raise ImportError("PyGithub not installed.\nRun: pip install PyGithub")
        self.gh = Github(token)
        self.username = username

    def extract(self) -> Iterator[RawDocument]:
        user = self.gh.get_user(self.username)

        # Public + private repos
        for repo in user.get_repos():
            try:
                readme = repo.get_readme()
                content = readme.decoded_content.decode("utf-8", errors="replace")
                if content.strip():
                    yield RawDocument(
                        title=f"[GitHub README] {repo.full_name}",
                        raw_content=content,
                        content_hash=sha256(content),
                        mime_type="text/markdown",
                        file_size_bytes=len(content.encode()),
                        source_url=repo.html_url,
                        source_metadata={
                            "type": "readme",
                            "repo": repo.full_name,
                            "stars": repo.stargazers_count,
                            "language": repo.language,
                            "topics": repo.get_topics(),
                        },
                        created_at_source=repo.created_at,
                        external_id=f"readme:{repo.full_name}",
                    )
            except GithubException:
                pass  # Repo has no README

            # Open issues / feature requests
            for issue in repo.get_issues(state="all")[:50]:
                body = issue.body or ""
                content = f"# {issue.title}\n\n{body}"
                if content.strip():
                    yield RawDocument(
                        title=f"[GitHub Issue] {repo.name} #{issue.number}: {issue.title}",
                        raw_content=content,
                        content_hash=sha256(content),
                        mime_type="text/plain",
                        file_size_bytes=len(content.encode()),
                        source_url=issue.html_url,
                        source_metadata={
                            "type": "issue",
                            "repo": repo.full_name,
                            "state": issue.state,
                            "labels": [l.name for l in issue.labels],
                            "number": issue.number,
                        },
                        created_at_source=issue.created_at,
                        external_id=f"issue:{repo.full_name}#{issue.number}",
                    )

        # Gists
        for gist in user.get_gists():
            for filename, gist_file in gist.files.items():
                try:
                    content = gist_file.content or ""
                    if content.strip():
                        yield RawDocument(
                            title=f"[GitHub Gist] {filename}",
                            raw_content=content,
                            content_hash=sha256(content),
                            mime_type=gist_file.type or "text/plain",
                            file_size_bytes=gist_file.size,
                            source_url=gist.html_url,
                            source_metadata={
                                "type": "gist",
                                "gist_id": gist.id,
                                "description": gist.description,
                                "filename": filename,
                            },
                            created_at_source=gist.created_at,
                            external_id=f"gist:{gist.id}:{filename}",
                        )
                except Exception:  # noqa: BLE001
                    pass
