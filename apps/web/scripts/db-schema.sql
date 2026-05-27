-- OTC FAQ Bot: Supabase pgvector schema
-- Run this in the Supabase SQL Editor before ingesting FAQ data

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS vector;       -- pgvector
CREATE EXTENSION IF NOT EXISTS pg_trgm;      -- trigram (used by BM25 fallback)

-- 2. FAQ chunks table
CREATE TABLE IF NOT EXISTS faq_chunks (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  faq_id      text        NOT NULL,                      -- source FAQ id, e.g. "otc-001"
  category    text        NOT NULL,                      -- e.g. "basics", "kyc", "pricing"
  question    text        NOT NULL,
  answer      text        NOT NULL,
  content     text        NOT NULL,                      -- question + "\n" + answer (embedded)
  embedding   vector(1536),                             -- OpenAI text-embedding-3-small
  fts_vector  tsvector GENERATED ALWAYS AS (
                to_tsvector('english', content)
              ) STORED,                                 -- BM25 full-text search index
  created_at  timestamptz DEFAULT now()
);

-- 3. Indexes
-- Vector ANN index (cosine distance, IVFFlat with 100 lists suits <100k rows)
CREATE INDEX IF NOT EXISTS faq_chunks_embedding_idx
  ON faq_chunks USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- Full-text GIN index for BM25 keyword search
CREATE INDEX IF NOT EXISTS faq_chunks_fts_idx
  ON faq_chunks USING gin (fts_vector);

-- Category filter index
CREATE INDEX IF NOT EXISTS faq_chunks_category_idx
  ON faq_chunks (category);

-- 4. Hybrid search function
--    Returns rows ranked by a combined score: 0.7 * vector_score + 0.3 * bm25_score
--    The caller then passes results to Cohere Reranker for final ordering.
CREATE OR REPLACE FUNCTION hybrid_search(
  query_embedding vector(1536),
  query_text      text,
  match_count     int DEFAULT 10
)
RETURNS TABLE (
  id          uuid,
  faq_id      text,
  category    text,
  question    text,
  answer      text,
  content     text,
  vector_score float,
  bm25_score   float,
  hybrid_score float
)
LANGUAGE sql STABLE
AS $$
  WITH
  vector_results AS (
    SELECT
      fc.id,
      fc.faq_id,
      fc.category,
      fc.question,
      fc.answer,
      fc.content,
      1 - (fc.embedding <=> query_embedding) AS vector_score
    FROM faq_chunks fc
    ORDER BY fc.embedding <=> query_embedding
    LIMIT match_count * 2
  ),
  bm25_results AS (
    SELECT
      fc.id,
      ts_rank_cd(fc.fts_vector, plainto_tsquery('english', query_text)) AS bm25_score
    FROM faq_chunks fc
    WHERE fc.fts_vector @@ plainto_tsquery('english', query_text)
    LIMIT match_count * 2
  )
  SELECT
    vr.id,
    vr.faq_id,
    vr.category,
    vr.question,
    vr.answer,
    vr.content,
    vr.vector_score,
    COALESCE(br.bm25_score, 0)                          AS bm25_score,
    0.7 * vr.vector_score + 0.3 * COALESCE(br.bm25_score, 0) AS hybrid_score
  FROM vector_results vr
  LEFT JOIN bm25_results br ON vr.id = br.id
  ORDER BY hybrid_score DESC
  LIMIT match_count;
$$;
