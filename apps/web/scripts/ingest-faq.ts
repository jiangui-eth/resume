/**
 * OTC FAQ Ingestion Script
 * ─────────────────────────────────────────────────────────────────────────
 * Reads src/data/faq-otc.json, generates OpenAI embeddings for each entry,
 * and upserts them into the Supabase faq_chunks table.
 *
 * Prerequisites:
 *   1. Run scripts/db-schema.sql in your Supabase project
 *   2. Set OPENAI_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY in .env
 *
 * Usage:
 *   npx tsx scripts/ingest-faq.ts
 */

import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import faqData from "../src/data/faq-otc.json";

const EMBEDDING_MODEL = "text-embedding-3-small";
const EMBEDDING_DIMS = 1536;
const BATCH_SIZE = 20; // OpenAI embedding API accepts up to 2048 inputs per request

type FaqEntry = {
  id: string;
  category: string;
  question: string;
  answer: string;
};

async function embedBatch(
  openai: OpenAI,
  texts: string[]
): Promise<number[][]> {
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: texts,
    dimensions: EMBEDDING_DIMS,
  });
  return response.data.map((d) => d.embedding);
}

async function main() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!supabaseUrl || !supabaseKey || !openaiKey) {
    console.error(
      "Missing env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY"
    );
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const openai = new OpenAI({ apiKey: openaiKey });

  const entries: FaqEntry[] = faqData as FaqEntry[];
  console.log(`Ingesting ${entries.length} FAQ entries…`);

  // Process in batches
  for (let i = 0; i < entries.length; i += BATCH_SIZE) {
    const batch = entries.slice(i, i + BATCH_SIZE);
    const contents = batch.map((e) => `${e.question}\n${e.answer}`);

    console.log(
      `  Embedding batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(entries.length / BATCH_SIZE)}…`
    );
    const embeddings = await embedBatch(openai, contents);

    const rows = batch.map((e, idx) => ({
      faq_id: e.id,
      category: e.category,
      question: e.question,
      answer: e.answer,
      content: contents[idx],
      embedding: `[${embeddings[idx].join(",")}]`, // Supabase expects stringified vector
    }));

    const { error } = await supabase
      .from("faq_chunks")
      .upsert(rows, { onConflict: "faq_id" });

    if (error) {
      console.error("Supabase upsert error:", error);
      process.exit(1);
    }
    console.log(`  ✓ Batch done (${batch.length} rows)`);
  }

  console.log("✅ Ingestion complete!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
