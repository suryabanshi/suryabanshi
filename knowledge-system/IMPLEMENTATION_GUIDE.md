# Knowledge Extraction System — Implementation Guide

> **Goal:** Turn your entire digital footprint into a centralized, AI-powered intelligence layer that surfaces business opportunities, patterns, and insights — automatically.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        DATA SOURCES                                 │
│  Google Drive │ Dropbox │ Notion │ GitHub │ ChatGPT │ Claude │ Files│
└──────────────────────────┬──────────────────────────────────────────┘
                           │ connectors (OAuth / API keys)
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     INGESTION LAYER                                 │
│  LocalFileConnector │ GoogleDriveConnector │ NotionConnector │ ...  │
│                    Normalizer (dedup + raw_documents table)         │
└──────────────────────────┬──────────────────────────────────────────┘
                           │ pending raw_documents
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   PROCESSING PIPELINE                               │
│  KnowledgeExtractor (Claude) → AutoTagger → EmbeddingGenerator     │
│       ↓ knowledge_items  ↓ ideas  ↓ opportunities  ↓ tags          │
└──────────────────────────┬──────────────────────────────────────────┘
                           │ structured data
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      SUPABASE DATABASE                              │
│  knowledge_items │ ideas │ projects │ opportunities │ contacts      │
│  content_library │ patterns │ relationships │ insights │ timeline   │
│                     pgvector (semantic search)                      │
└──────────────┬──────────────────────────┬───────────────────────────┘
               │                          │
               ▼                          ▼
┌──────────────────────────┐  ┌──────────────────────────────────────┐
│    ANALYSIS ENGINE       │  │         AUTOMATION                   │
│  InsightEngine (Claude)  │  │  Scheduler │ n8n │ Zapier │ Webhooks │
│  OpportunityFinder       │  │  Auto-sync every 60 min              │
└──────────────────────────┘  └──────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        FASTAPI REST LAYER                           │
│  /api/v1/knowledge  │ /api/v1/insights │ /api/v1/ingest/webhook    │
│  /api/v1/sync       │ /api/v1/opportunities                        │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack Rationale

| Layer | Choice | Why |
|-------|--------|-----|
| Database | **Supabase** (PostgreSQL) | Real SQL, pgvector, Row Level Security, REST API, free tier, real-time |
| AI Extraction | **Claude claude-sonnet-4-6** | Best structured JSON extraction, nuanced business analysis |
| Embeddings | **OpenAI text-embedding-3-small** | 1536-dim, cheap ($0.02/1M tokens), best-in-class recall |
| API | **FastAPI** | Async, auto-docs, Pydantic validation |
| Automation | **n8n** (self-hosted) | Visual workflows, 500+ integrations, no per-task pricing |
| Scheduling | **schedule** Python library | Simple cron-like jobs, replaceable with Celery for scale |
| Deployment | **Docker Compose** | Self-contained, easy to deploy on any VPS |

---

## Step-by-Step Setup

### Phase 1: Database (30 minutes)

1. **Create a Supabase project** at [supabase.com](https://supabase.com) (free tier works)

2. **Run the schema:**
   - Go to Supabase Dashboard → SQL Editor
   - Open `schema/supabase_schema.sql`
   - Run the entire file

3. **Enable pgvector:**
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```
   (Already in the schema, but verify it's enabled in Extensions tab)

4. **Copy your keys:**
   - Settings → API → copy `URL`, `anon key`, and `service_role key`

### Phase 2: Environment (15 minutes)

```bash
cp .env.example .env
# Edit .env with your keys
```

**Minimum required:**
```
SUPABASE_URL=...
SUPABASE_SERVICE_KEY=...
ANTHROPIC_API_KEY=...
```

**For embeddings (recommended):**
```
OPENAI_API_KEY=...
```

### Phase 3: Install & Run (10 minutes)

```bash
# Option A: Docker (recommended for production)
docker-compose up -d

# Option B: Local Python
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn api.main:app --reload --port 8000
```

Verify: `curl http://localhost:8000/health`

### Phase 4: Connect Data Sources

#### Google Drive
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a Service Account → download JSON → save as `credentials/google_service_account.json`
3. Enable Drive API
4. Share your Drive folder with the service account email
5. Set `GOOGLE_DRIVE_FOLDER_ID` in `.env` (or leave empty for entire Drive)
6. Register source in database:
   ```sql
   INSERT INTO data_sources (name, source_type, config)
   VALUES ('My Google Drive', 'google_drive', '{"folder_id": "your-folder-id"}');
   ```

#### Notion
1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Create integration → copy the secret
3. Share your databases with the integration
4. Set `NOTION_API_KEY` and `NOTION_DATABASE_IDS` in `.env`

#### ChatGPT / Claude Export
1. ChatGPT: Settings → Data Controls → Export Data → download `conversations.json`
2. Claude: Settings → Export Data → download conversations
3. Register in database:
   ```sql
   INSERT INTO data_sources (name, source_type, config)
   VALUES ('ChatGPT History', 'chat_gpt', '{"file_path": "/data/chatgpt/conversations.json"}');
   ```

#### Local Files (PDF, Word, etc.)
```sql
INSERT INTO data_sources (name, source_type, config)
VALUES ('My Documents', 'text', '{"root_path": "/path/to/docs", "recursive": true}');
```

### Phase 5: First Sync

```bash
# Via API
curl -X POST http://localhost:8000/api/v1/sync/run
# Wait 30s
curl -X POST http://localhost:8000/api/v1/sync/process
# Generate insights (run after 10+ items are processed)
curl -X POST http://localhost:8000/api/v1/insights/generate
```

### Phase 6: Set Up Automation (n8n)

1. Open n8n at `http://localhost:5678`
2. Import workflow: Workflows → Import → paste `automation/workflows/n8n_workflow.json`
3. Set environment variable `KNOWLEDGE_API_URL=http://api:8000`
4. Activate the workflow

### Phase 7: Set Up Zapier Webhooks

For each trigger (new Drive file, new email, etc.) follow the `automation/workflows/zapier_zaps.md` guide. Each Zap sends a POST to:
```
http://your-server.com/api/v1/ingest/webhook
```

---

## Database Schema Quick Reference

| Table | Purpose |
|-------|---------|
| `data_sources` | Registry of all connected sources (Drive, Notion, etc.) |
| `raw_documents` | Every ingested document before AI processing |
| `knowledge_items` | Processed, structured knowledge units with embeddings |
| `tags` + `knowledge_item_tags` | Multi-layer tagging (topic/domain/status/priority) |
| `ideas` | Extracted ideas with viability scores |
| `projects` | Active and planned projects |
| `opportunities` | Monetizable opportunities ranked by ROI |
| `contacts` | People and companies from your knowledge base |
| `content_library` | Content pieces: articles, videos, posts |
| `patterns` | Recurring themes detected across all data |
| `relationships` | Graph edges connecting any entities |
| `timeline_events` | Full history of how ideas evolved |
| `insights` | AI-generated strategic insights |
| `sync_jobs` | Audit log of every sync run |

---

## Key API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/knowledge/` | List knowledge items (filterable) |
| POST | `/api/v1/knowledge/search` | Full-text search |
| GET | `/api/v1/knowledge/focus-areas` | What you think about most |
| GET | `/api/v1/knowledge/stats/overview` | Database counts |
| GET | `/api/v1/insights/` | List strategic insights |
| POST | `/api/v1/insights/generate` | Trigger AI insight generation |
| GET | `/api/v1/insights/opportunities` | Ranked opportunity pipeline |
| POST | `/api/v1/insights/opportunities/find` | Mine new opportunities |
| POST | `/api/v1/insights/opportunities/{id}/action-plan` | Generate 7-step plan |
| POST | `/api/v1/ingest/webhook` | Accept document from Zapier/n8n |
| POST | `/api/v1/sync/run` | Trigger full sync |
| POST | `/api/v1/sync/process` | Process pending documents |
| GET | `/api/v1/sync/status` | Processing queue status |

Auto-generated docs: `http://localhost:8000/docs`

---

## Cost Estimates

| Service | Usage | Estimated Monthly Cost |
|---------|-------|----------------------|
| Supabase | Free tier (500MB DB, 1GB storage) | **$0** |
| Claude claude-sonnet-4-6 | 1000 docs/month × ~2K tokens | **~$6** |
| OpenAI embeddings | 1000 docs × 1K tokens | **~$0.02** |
| n8n (self-hosted on $6 VPS) | Unlimited workflows | **$6** |
| Total | | **~$12/month** |

For 10,000 docs/month: ~$60/month total.

---

## Scaling Path

1. **0–1K docs:** Single Docker Compose on any $6 VPS (DigitalOcean, Hetzner)
2. **1K–50K docs:** Add Redis queue (Celery workers), upgrade Supabase to Pro ($25/mo)
3. **50K+ docs:** Separate ingestion/processing workers, add read replicas, use Supabase Vector indexes

---

## Monetization Ideas This System Enables

Once populated with your knowledge base:

1. **Productize your expertise** — the system identifies your deepest topic clusters → turn them into courses, templates, or consulting offers
2. **Content calendar automation** — auto-generate 30 days of content from your knowledge items → post to your audience
3. **SaaS opportunity detection** — the opportunity finder identifies repeated problems you've solved → validate as micro-SaaS
4. **Client proposal generator** — combine knowledge items + opportunities → instantly draft proposals for clients
5. **Newsletter with AI digest** — daily insights email sent automatically from your own intelligence

---

## Security Notes

- Never commit `.env` — it contains API keys
- Use Supabase RLS policies for any public-facing queries
- Rotate `API_SECRET_KEY` before deploying to production
- Store Google service account credentials in `credentials/` (gitignored)
- For production: add API key auth middleware to FastAPI routes
