import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    CORS_ORIGIN: z.url(),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

    // ── OTC FAQ Bot: RAG pipeline ──────────────────────────────────────────
    // OpenAI – embeddings (text-embedding-3-small) + chat completion (gpt-4o-mini)
    OPENAI_API_KEY: z.string().min(1).optional(),
    // Supabase – pgvector storage
    SUPABASE_URL: z.url().optional(),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
    // Cohere – reranker
    COHERE_API_KEY: z.string().min(1).optional(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
