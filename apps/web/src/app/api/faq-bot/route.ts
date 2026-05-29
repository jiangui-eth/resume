/**
 * OTC FAQ Bot – RAG API Route
 * ─────────────────────────────────────────────────────────────────────────
 * Pipeline:
 *   1. Embed user query (OpenAI text-embedding-3-small)
 *   2. Hybrid search: pgvector (cosine) + BM25 full-text via Supabase RPC
 *   3. Cohere Rerank – picks top 3 from merged candidates
 *   4. Stream GPT-4o-mini answer with cited sources
 *
 * POST /api/faq-bot
 * Body: { query: string; history?: { role: "user"|"assistant"; content: string }[] }
 * Response: text/event-stream  (SSE, each chunk is plain text delta)
 */

import { NextRequest } from "next/server";
import OpenAI from "openai";
import { CohereClient } from "cohere-ai";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const maxDuration = 60;

// ── Types ─────────────────────────────────────────────────────────────────

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  query: string;
  history?: ChatMessage[];
}

interface FaqChunkRow {
  id: string;
  faq_id: string;
  category: string;
  question: string;
  answer: string;
  content: string;
  hybrid_score: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────

function getClients() {
  const openaiKey = process.env.OPENAI_API_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const cohereKey = process.env.COHERE_API_KEY;

  if (!openaiKey || !supabaseUrl || !supabaseKey || !cohereKey) {
    throw new Error(
      "Missing required env vars: OPENAI_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, COHERE_API_KEY"
    );
  }

  return {
    openai: new OpenAI({ apiKey: openaiKey }),
    supabase: createClient(supabaseUrl, supabaseKey),
    cohere: new CohereClient({ token: cohereKey }),
  };
}

async function embedQuery(openai: OpenAI, query: string): Promise<number[]> {
  const res = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query,
    dimensions: 1536,
  });
  return res.data[0].embedding;
}

async function hybridSearch(
  supabase: ReturnType<typeof createClient>,
  embedding: number[],
  queryText: string,
  matchCount = 10
): Promise<FaqChunkRow[]> {
  const { data, error } = await supabase.rpc("hybrid_search", {
    query_embedding: `[${embedding.join(",")}]`,
    query_text: queryText,
    match_count: matchCount,
  });

  if (error) throw new Error(`Supabase hybrid_search error: ${error.message}`);
  return (data ?? []) as FaqChunkRow[];
}

async function rerankChunks(
  cohere: CohereClient,
  query: string,
  chunks: FaqChunkRow[],
  topN = 3
): Promise<FaqChunkRow[]> {
  if (chunks.length === 0) return [];

  const response = await cohere.rerank({
    model: "rerank-english-v3.0",
    query,
    documents: chunks.map((c) => c.content),
    topN: Math.min(topN, chunks.length),
  });

  return response.results.map((r) => chunks[r.index]);
}

function buildSystemPrompt(context: FaqChunkRow[]): string {
  const contextBlock = context
    .map(
      (c, i) =>
        `[Source ${i + 1}] Q: ${c.question}\nA: ${c.answer}`
    )
    .join("\n\n");

  return `You are an OTC (Over-The-Counter) trading assistant. Answer the user's question accurately and concisely using ONLY the provided FAQ context below. If the answer is not in the context, say "I don't have that information — please contact our OTC desk directly."

Always be professional, clear, and helpful. When referencing specific details, cite the relevant source naturally in your answer.

FAQ Context:
${contextBlock}`;
}

// ── Demo mode: answer from FAQ data without external APIs ─────────────────

function buildDemoAnswer(query: string): string {
  const lq = query.toLowerCase();

  if (lq.includes("minimum") || lq.includes("min")) {
    return "The minimum OTC trade size is typically **$50,000 USD equivalent**. For premium desks the floor may be $100,000. There is no maximum — orders of $1M–$500M+ are handled routinely.";
  }
  if (lq.includes("kyc") || lq.includes("document") || lq.includes("verify")) {
    return "For **KYC**, individual clients need: government-issued photo ID, proof of address (<3 months), source-of-funds declaration, and a liveness check. Corporate clients (KYB) also need incorporation docs, shareholder registry, and AML policy. Standard review takes 1–3 business days.";
  }
  if (lq.includes("fee") || lq.includes("spread") || lq.includes("cost") || lq.includes("price")) {
    return "OTC pricing is **spread-based** — no separate commission. For BTC/ETH trades above $1M, spreads are typically **0.05%–0.20%**. Smaller or less liquid orders: **0.20%–0.50%**. Network fees may be passed on. Ask your account manager for an exact indicative quote.";
  }
  if (lq.includes("settlement") || lq.includes("how long") || lq.includes("time")) {
    return "**Crypto-to-crypto** settlement: instant to 30 minutes after on-chain confirmation. **Crypto-to-fiat** (wire): 1–2 business days. **Fiat-to-crypto**: 1–3 business days for incoming wire clearing.";
  }
  if (lq.includes("24") || lq.includes("available") || lq.includes("hours")) {
    return "Yes — OTC crypto trading is available **24/7**. Fiat settlement follows banking hours (Mon–Fri, 9am–5pm in your jurisdiction). After-hours quote response time may be up to 15 minutes.";
  }
  if (lq.includes("what is otc") || lq.includes("what's otc") || lq.includes("explain otc")) {
    return "**OTC (Over-The-Counter) trading** lets institutional clients execute large crypto transactions directly with a counterparty, outside the public order book. This eliminates slippage and market impact that would occur when trading large volumes on an exchange. Typical minimum is $50,000 USD equivalent.";
  }

  return "I can answer questions about OTC trading topics such as: minimum trade sizes, fees & spreads, settlement timelines, KYC requirements, supported assets, security, and how the process works. What would you like to know?";
}

// ── Route Handler ──────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const { query, history = [] } = body;
  if (!query?.trim()) {
    return new Response("query is required", { status: 400 });
  }

  const encoder = new TextEncoder();

  // ── Demo mode: when API keys are not configured ──────────────────────────
  const hasKeys =
    process.env.OPENAI_API_KEY &&
    process.env.SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY &&
    process.env.COHERE_API_KEY;

  if (!hasKeys) {
    const demoAnswer = buildDemoAnswer(query);
    const stream = new ReadableStream({
      start(controller) {
        // Simulate streaming by chunking the demo answer
        const words = demoAnswer.split(" ");
        let i = 0;
        const interval = setInterval(() => {
          if (i < words.length) {
            const chunk = (i === 0 ? "" : " ") + words[i];
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ delta: chunk })}\n\n`));
            i++;
          } else {
            controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
            clearInterval(interval);
            controller.close();
          }
        }, 30);
      },
    });
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "X-Faq-Mode": "demo",
      },
    });
  }

  // ── Full RAG pipeline ────────────────────────────────────────────────────
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: object) =>
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
        );

      try {
        const { openai, supabase, cohere } = getClients();

        // Step 1: Embed query
        const embedding = await embedQuery(openai, query);

        // Step 2: Hybrid search (pgvector + BM25)
        const candidates = await hybridSearch(supabase, embedding, query, 10);

        // Step 3: Cohere Rerank → top 3
        const reranked = await rerankChunks(cohere, query, candidates, 3);

        // Step 4: Stream GPT-4o-mini answer
        const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
          { role: "system", content: buildSystemPrompt(reranked) },
          ...history.map((m) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          })),
          { role: "user", content: query },
        ];

        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages,
          stream: true,
          temperature: 0.3,
          max_tokens: 512,
        });

        for await (const chunk of completion) {
          const delta = chunk.choices[0]?.delta?.content ?? "";
          if (delta) send({ delta });
        }

        // Send source citations
        const sources = reranked.map((c) => ({
          question: c.question,
          category: c.category,
        }));
        send({ sources });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unknown error in RAG pipeline";
        send({ error: message });
      } finally {
        controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
