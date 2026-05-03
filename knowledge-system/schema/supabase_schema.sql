-- ============================================================
-- KNOWLEDGE EXTRACTION SYSTEM — Supabase / PostgreSQL Schema
-- ============================================================
-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";          -- pgvector for semantic search
CREATE EXTENSION IF NOT EXISTS "pg_trgm";         -- trigram for fuzzy text search

-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE content_category AS ENUM (
    'business', 'idea', 'research', 'content', 'system',
    'contact', 'opportunity', 'personal', 'finance', 'tech', 'other'
);

CREATE TYPE source_type AS ENUM (
    'google_drive', 'dropbox', 'icloud', 'notion', 'obsidian',
    'pdf', 'word', 'excel', 'markdown', 'text', 'image', 'video',
    'chat_gpt', 'claude', 'gemini', 'whatsapp', 'telegram',
    'email', 'calendar', 'canva', 'figma', 'github', 'api', 'manual'
);

CREATE TYPE processing_status AS ENUM (
    'pending', 'processing', 'completed', 'failed', 'skipped'
);

CREATE TYPE opportunity_stage AS ENUM (
    'discovered', 'validated', 'in_progress', 'launched', 'paused', 'abandoned'
);

CREATE TYPE relationship_type AS ENUM (
    'related_to', 'part_of', 'leads_to', 'contradicts',
    'supports', 'inspired_by', 'blocks', 'references'
);

-- ============================================================
-- TABLE: data_sources
-- Registry of all connected data sources
-- ============================================================
CREATE TABLE data_sources (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            TEXT NOT NULL,
    source_type     source_type NOT NULL,
    config          JSONB NOT NULL DEFAULT '{}',   -- connector-specific config (encrypted at app layer)
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    last_synced_at  TIMESTAMPTZ,
    sync_cursor     TEXT,                           -- bookmark / page token for incremental sync
    total_records   INTEGER DEFAULT 0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE: raw_documents
-- Every ingested document before processing
-- ============================================================
CREATE TABLE raw_documents (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id       UUID NOT NULL REFERENCES data_sources(id) ON DELETE CASCADE,
    external_id     TEXT,                           -- ID in the originating system
    title           TEXT,
    raw_content     TEXT,
    content_hash    TEXT NOT NULL,                  -- SHA-256 for dedup
    mime_type       TEXT,
    file_size_bytes BIGINT,
    source_url      TEXT,
    source_metadata JSONB DEFAULT '{}',             -- original metadata from source
    created_at_source TIMESTAMPTZ,
    processing_status processing_status NOT NULL DEFAULT 'pending',
    processing_error  TEXT,
    processed_at    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (source_id, content_hash)
);

CREATE INDEX idx_raw_docs_source       ON raw_documents(source_id);
CREATE INDEX idx_raw_docs_status       ON raw_documents(processing_status);
CREATE INDEX idx_raw_docs_hash         ON raw_documents(content_hash);
CREATE INDEX idx_raw_docs_created      ON raw_documents(created_at DESC);

-- ============================================================
-- TABLE: knowledge_items
-- Processed, structured knowledge units
-- ============================================================
CREATE TABLE knowledge_items (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    raw_doc_id      UUID REFERENCES raw_documents(id) ON DELETE SET NULL,
    title           TEXT NOT NULL,
    summary         TEXT NOT NULL,
    full_content    TEXT,
    category        content_category NOT NULL DEFAULT 'other',
    subcategory     TEXT,
    source_type     source_type,
    importance_score FLOAT DEFAULT 0.5,            -- 0.0 – 1.0 AI-assigned importance
    embedding       vector(1536),                  -- OpenAI/Claude embedding for semantic search
    key_topics      TEXT[] DEFAULT '{}',
    key_entities    JSONB DEFAULT '[]',            -- [{name, type, confidence}]
    sentiment       TEXT,                          -- positive / neutral / negative
    language        TEXT DEFAULT 'en',
    word_count      INTEGER,
    created_at_source TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_ki_category    ON knowledge_items(category);
CREATE INDEX idx_ki_importance  ON knowledge_items(importance_score DESC);
CREATE INDEX idx_ki_topics      ON knowledge_items USING GIN(key_topics);
CREATE INDEX idx_ki_entities    ON knowledge_items USING GIN(key_entities);
CREATE INDEX idx_ki_created     ON knowledge_items(created_at DESC);
CREATE INDEX idx_ki_fts         ON knowledge_items USING GIN(to_tsvector('english', title || ' ' || summary));
-- Semantic similarity search index
CREATE INDEX idx_ki_embedding   ON knowledge_items USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- ============================================================
-- TABLE: tags
-- Dynamic multi-layer tag system
-- ============================================================
CREATE TABLE tags (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        TEXT NOT NULL UNIQUE,
    slug        TEXT NOT NULL UNIQUE,
    color       TEXT DEFAULT '#6366f1',
    layer       TEXT DEFAULT 'topic',              -- topic | domain | status | priority | custom
    description TEXT,
    usage_count INTEGER DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tags_layer ON tags(layer);
CREATE INDEX idx_tags_usage ON tags(usage_count DESC);

CREATE TABLE knowledge_item_tags (
    knowledge_item_id UUID NOT NULL REFERENCES knowledge_items(id) ON DELETE CASCADE,
    tag_id            UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    confidence        FLOAT DEFAULT 1.0,           -- AI tagging confidence
    is_auto_tagged    BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (knowledge_item_id, tag_id)
);

-- ============================================================
-- TABLE: ideas
-- Extracted and manually added ideas with evaluation
-- ============================================================
CREATE TABLE ideas (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title           TEXT NOT NULL,
    description     TEXT NOT NULL,
    problem_solved  TEXT,
    target_audience TEXT,
    potential_value TEXT,                          -- monetary / strategic
    effort_estimate TEXT,                          -- low / medium / high
    viability_score FLOAT DEFAULT 0.5,             -- 0.0 – 1.0
    novelty_score   FLOAT DEFAULT 0.5,
    market_size     TEXT,
    notes           TEXT,
    status          TEXT DEFAULT 'raw',            -- raw | refined | validated | shelved
    source_item_id  UUID REFERENCES knowledge_items(id) ON DELETE SET NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_ideas_viability ON ideas(viability_score DESC);
CREATE INDEX idx_ideas_status    ON ideas(status);

-- ============================================================
-- TABLE: projects
-- Active and planned projects
-- ============================================================
CREATE TABLE projects (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            TEXT NOT NULL,
    description     TEXT,
    goal            TEXT,
    status          TEXT DEFAULT 'planning',       -- planning | active | on_hold | completed | cancelled
    start_date      DATE,
    target_date     DATE,
    completed_date  DATE,
    revenue_target  NUMERIC(14,2),
    revenue_actual  NUMERIC(14,2),
    tags            TEXT[] DEFAULT '{}',
    metadata        JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projects_status ON projects(status);

-- ============================================================
-- TABLE: opportunities
-- Monetizable / high-value opportunities extracted from knowledge
-- ============================================================
CREATE TABLE opportunities (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title           TEXT NOT NULL,
    description     TEXT NOT NULL,
    category        TEXT,                          -- SaaS | freelance | content | product | partnership
    stage           opportunity_stage DEFAULT 'discovered',
    confidence      FLOAT DEFAULT 0.5,
    estimated_revenue_monthly NUMERIC(14,2),
    estimated_effort_days     INTEGER,
    roi_score       FLOAT,                         -- computed: revenue / effort
    action_items    JSONB DEFAULT '[]',            -- [{task, deadline, done}]
    source_item_ids UUID[] DEFAULT '{}',
    project_id      UUID REFERENCES projects(id) ON DELETE SET NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_opp_roi   ON opportunities(roi_score DESC NULLS LAST);
CREATE INDEX idx_opp_stage ON opportunities(stage);

-- ============================================================
-- TABLE: contacts
-- People, companies, communities encountered in the knowledge base
-- ============================================================
CREATE TABLE contacts (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            TEXT NOT NULL,
    type            TEXT DEFAULT 'person',         -- person | company | community
    email           TEXT,
    social_handles  JSONB DEFAULT '{}',            -- {twitter, linkedin, github, ...}
    role            TEXT,
    company         TEXT,
    relationship    TEXT DEFAULT 'unknown',        -- collaborator | client | mentor | competitor | prospect
    notes           TEXT,
    last_interaction TIMESTAMPTZ,
    interaction_count INTEGER DEFAULT 0,
    tags            TEXT[] DEFAULT '{}',
    metadata        JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_contacts_type         ON contacts(type);
CREATE INDEX idx_contacts_relationship ON contacts(relationship);
CREATE INDEX idx_contacts_name         ON contacts USING GIN(to_tsvector('english', name));

-- ============================================================
-- TABLE: content_library
-- Content pieces: articles, videos, posts, scripts, etc.
-- ============================================================
CREATE TABLE content_library (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title           TEXT NOT NULL,
    content_type    TEXT NOT NULL,                 -- article | video | post | thread | newsletter | script
    platform        TEXT,                          -- medium | youtube | twitter | substack | linkedin
    status          TEXT DEFAULT 'idea',           -- idea | draft | review | published | archived
    body            TEXT,
    url             TEXT,
    performance     JSONB DEFAULT '{}',            -- {views, likes, shares, revenue}
    keywords        TEXT[] DEFAULT '{}',
    project_id      UUID REFERENCES projects(id) ON DELETE SET NULL,
    published_at    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_content_type     ON content_library(content_type);
CREATE INDEX idx_content_status   ON content_library(status);
CREATE INDEX idx_content_platform ON content_library(platform);

-- ============================================================
-- TABLE: patterns
-- Recurring themes, behaviors, and patterns detected across all data
-- ============================================================
CREATE TABLE patterns (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pattern_name    TEXT NOT NULL,
    description     TEXT NOT NULL,
    frequency       INTEGER DEFAULT 1,             -- how many times observed
    first_seen      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_seen       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    strength        FLOAT DEFAULT 0.5,             -- 0.0 – 1.0
    category        TEXT,
    example_ids     UUID[] DEFAULT '{}',           -- knowledge_item IDs as evidence
    metadata        JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_patterns_frequency ON patterns(frequency DESC);
CREATE INDEX idx_patterns_strength  ON patterns(strength DESC);

-- ============================================================
-- TABLE: relationships
-- Graph edges connecting any entities across the system
-- ============================================================
CREATE TABLE relationships (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    from_table      TEXT NOT NULL,
    from_id         UUID NOT NULL,
    to_table        TEXT NOT NULL,
    to_id           UUID NOT NULL,
    rel_type        relationship_type NOT NULL,
    strength        FLOAT DEFAULT 0.5,
    description     TEXT,
    is_auto         BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (from_table, from_id, to_table, to_id, rel_type)
);

CREATE INDEX idx_rel_from ON relationships(from_table, from_id);
CREATE INDEX idx_rel_to   ON relationships(to_table, to_id);

-- ============================================================
-- TABLE: timeline_events
-- Track evolution of ideas and activities over time
-- ============================================================
CREATE TABLE timeline_events (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_table    TEXT NOT NULL,
    entity_id       UUID NOT NULL,
    event_type      TEXT NOT NULL,                 -- created | updated | tagged | linked | milestone
    description     TEXT,
    snapshot        JSONB DEFAULT '{}',            -- state snapshot at this moment
    occurred_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_timeline_entity   ON timeline_events(entity_table, entity_id);
CREATE INDEX idx_timeline_occurred ON timeline_events(occurred_at DESC);

-- ============================================================
-- TABLE: sync_jobs
-- Tracks every ingestion/sync run
-- ============================================================
CREATE TABLE sync_jobs (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id       UUID REFERENCES data_sources(id) ON DELETE CASCADE,
    status          processing_status NOT NULL DEFAULT 'pending',
    started_at      TIMESTAMPTZ,
    completed_at    TIMESTAMPTZ,
    records_found   INTEGER DEFAULT 0,
    records_new     INTEGER DEFAULT 0,
    records_updated INTEGER DEFAULT 0,
    records_failed  INTEGER DEFAULT 0,
    error_log       TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sync_source ON sync_jobs(source_id);
CREATE INDEX idx_sync_status ON sync_jobs(status);

-- ============================================================
-- TABLE: insights
-- AI-generated strategic insights
-- ============================================================
CREATE TABLE insights (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title           TEXT NOT NULL,
    body            TEXT NOT NULL,
    insight_type    TEXT NOT NULL,                 -- focus_area | gap | opportunity | pattern | warning
    priority        TEXT DEFAULT 'medium',         -- low | medium | high | critical
    action_required BOOLEAN DEFAULT FALSE,
    is_dismissed    BOOLEAN DEFAULT FALSE,
    evidence_ids    UUID[] DEFAULT '{}',           -- supporting knowledge_item IDs
    generated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at      TIMESTAMPTZ
);

CREATE INDEX idx_insights_priority ON insights(priority);
CREATE INDEX idx_insights_type     ON insights(insight_type);
CREATE INDEX idx_insights_active   ON insights(is_dismissed, generated_at DESC);

-- ============================================================
-- VIEWS
-- ============================================================

-- Top knowledge items by importance
CREATE VIEW v_top_knowledge AS
SELECT
    ki.id, ki.title, ki.summary, ki.category, ki.importance_score,
    ki.key_topics, ki.created_at,
    COUNT(DISTINCT kit.tag_id) AS tag_count,
    COUNT(DISTINCT r.id)       AS relationship_count
FROM knowledge_items ki
LEFT JOIN knowledge_item_tags kit ON ki.id = kit.knowledge_item_id
LEFT JOIN relationships r ON (r.from_id = ki.id OR r.to_id = ki.id)
GROUP BY ki.id
ORDER BY ki.importance_score DESC;

-- Active opportunities ranked by ROI
CREATE VIEW v_opportunity_pipeline AS
SELECT
    o.*,
    COALESCE(o.estimated_revenue_monthly * 12 / NULLIF(o.estimated_effort_days, 0), 0) AS computed_roi,
    p.name AS project_name
FROM opportunities o
LEFT JOIN projects p ON o.project_id = p.id
WHERE o.stage NOT IN ('abandoned')
ORDER BY computed_roi DESC NULLS LAST;

-- Knowledge focus areas (what you think about most)
CREATE VIEW v_focus_areas AS
SELECT
    unnest(key_topics) AS topic,
    COUNT(*)           AS frequency,
    AVG(importance_score) AS avg_importance,
    MAX(created_at)    AS last_seen
FROM knowledge_items
GROUP BY topic
ORDER BY frequency DESC
LIMIT 50;

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Semantic search: find knowledge items similar to a query embedding
CREATE OR REPLACE FUNCTION search_knowledge(
    query_embedding vector(1536),
    match_threshold FLOAT DEFAULT 0.7,
    match_count     INT   DEFAULT 10
)
RETURNS TABLE (
    id UUID, title TEXT, summary TEXT, category content_category,
    similarity FLOAT
)
LANGUAGE sql STABLE AS $$
    SELECT id, title, summary, category,
           1 - (embedding <=> query_embedding) AS similarity
    FROM knowledge_items
    WHERE embedding IS NOT NULL
      AND 1 - (embedding <=> query_embedding) > match_threshold
    ORDER BY embedding <=> query_embedding
    LIMIT match_count;
$$;

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON knowledge_items
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON ideas
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON opportunities
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON contacts
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON content_library
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON data_sources
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

-- Auto-update tag usage counts
CREATE OR REPLACE FUNCTION update_tag_usage()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE tags SET usage_count = usage_count + 1 WHERE id = NEW.tag_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE tags SET usage_count = usage_count - 1 WHERE id = OLD.tag_id;
    END IF;
    RETURN NULL;
END;
$$;

CREATE TRIGGER tag_usage_update AFTER INSERT OR DELETE ON knowledge_item_tags
    FOR EACH ROW EXECUTE FUNCTION update_tag_usage();

-- ============================================================
-- ROW LEVEL SECURITY (Supabase)
-- ============================================================
ALTER TABLE knowledge_items   ENABLE ROW LEVEL SECURITY;
ALTER TABLE ideas              ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects           ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities      ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts           ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_library    ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights           ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users full access to their own data
-- (Replace 'authenticated' with specific role policies as needed)
CREATE POLICY "Authenticated full access" ON knowledge_items
    FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated full access" ON ideas
    FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated full access" ON projects
    FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated full access" ON opportunities
    FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated full access" ON contacts
    FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated full access" ON content_library
    FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated full access" ON insights
    FOR ALL TO authenticated USING (true) WITH CHECK (true);
