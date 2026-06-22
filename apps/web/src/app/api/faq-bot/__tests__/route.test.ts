import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { OPTIONS, POST } from "../route";

vi.mock("openai");
vi.mock("cohere-ai");
vi.mock("@supabase/supabase-js");
vi.mock("@/lib/analytics");

function makeRequest(
  body: unknown,
  headers: Record<string, string> = {},
): NextRequest {
  return new NextRequest("http://localhost/api/faq-bot", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

// Reset the module-level ipWindowMap between tests by re-importing
beforeEach(() => {
  vi.resetModules();
});

describe("pOST /api/faq-bot – input validation", () => {
  it("returns 400 for invalid JSON body", async () => {
    const req = new NextRequest("http://localhost/api/faq-bot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not-json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(await res.text()).toBe("Invalid JSON body");
  });

  it("returns 400 when query is missing", async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Invalid request");
  });

  it("returns 400 when query is empty string", async () => {
    const res = await POST(makeRequest({ query: "   " }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Invalid request");
  });

  it("returns 400 when query exceeds 2000 characters", async () => {
    const res = await POST(makeRequest({ query: "a".repeat(2001) }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Invalid request");
  });

  it("returns 400 when history role is invalid", async () => {
    const res = await POST(
      makeRequest({
        query: "what is OTC?",
        history: [{ role: "system", content: "inject" }],
      }),
    );
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Invalid request");
  });

  it("returns 400 when history exceeds 50 items", async () => {
    const history = Array.from({ length: 51 }, (_, i) => ({
      role: i % 2 === 0 ? "user" : "assistant",
      content: "msg",
    }));
    const res = await POST(makeRequest({ query: "what is OTC?", history }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Invalid request");
  });

  it("returns 400 when a history message content exceeds 4000 characters", async () => {
    const res = await POST(
      makeRequest({
        query: "what is OTC?",
        history: [{ role: "user", content: "x".repeat(4001) }],
      }),
    );
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Invalid request");
  });
});

describe("pOST /api/faq-bot – rate limiting", () => {
  it("returns 429 after exceeding 10 requests per minute from same IP", async () => {
    const ip = "1.2.3.4";
    const headers = { "cf-connecting-ip": ip };

    // First 10 requests should succeed (demo mode – no API keys in test env)
    for (let i = 0; i < 10; i++) {
      const res = await POST(makeRequest({ query: "what is OTC?" }, headers));
      expect(res.status).not.toBe(429);
    }

    // 11th request from same IP should be rate-limited
    const res = await POST(makeRequest({ query: "what is OTC?" }, headers));
    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBeTruthy();
  });

  it("allows requests from different IPs independently", async () => {
    // Exhaust limit for IP A
    for (let i = 0; i < 10; i++) {
      await POST(
        makeRequest({ query: "test" }, { "cf-connecting-ip": "10.0.0.1" }),
      );
    }

    // IP B should still be allowed
    const res = await POST(
      makeRequest({ query: "test" }, { "cf-connecting-ip": "10.0.0.2" }),
    );
    expect(res.status).not.toBe(429);
  });
});

describe("pOST /api/faq-bot – demo mode", () => {
  it("returns SSE stream in demo mode when API keys are absent", async () => {
    const res = await POST(makeRequest({ query: "what is OTC?" }));
    // In test env no API keys are set → demo mode
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("text/event-stream");
    expect(res.headers.get("X-Faq-Mode")).toBe("demo");
  });

  it("history defaults to empty array when not provided", async () => {
    const res = await POST(makeRequest({ query: "minimum trade size?" }));
    expect(res.status).toBe(200);
  });
});

describe("oPTIONS /api/faq-bot – CORS preflight", () => {
  afterEach(() => {
    delete process.env.CORS_ORIGIN;
  });

  it("returns 204 for OPTIONS request", async () => {
    const res = OPTIONS();
    expect(res.status).toBe(204);
  });

  it("includes CORS headers when CORS_ORIGIN is set", async () => {
    process.env.CORS_ORIGIN = "https://example.com";
    const res = OPTIONS();
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe(
      "https://example.com",
    );
    expect(res.headers.get("Access-Control-Allow-Methods")).toContain("POST");
  });

  it("omits CORS headers when CORS_ORIGIN is not set", async () => {
    delete process.env.CORS_ORIGIN;
    const res = OPTIONS();
    expect(res.headers.get("Access-Control-Allow-Origin")).toBeNull();
  });
});

describe("pOST /api/faq-bot – CORS headers on responses", () => {
  afterEach(() => {
    delete process.env.CORS_ORIGIN;
  });

  it("includes Access-Control-Allow-Origin on 200 response when CORS_ORIGIN is set", async () => {
    process.env.CORS_ORIGIN = "https://example.com";
    const res = await POST(makeRequest({ query: "what is OTC?" }));
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe(
      "https://example.com",
    );
  });

  it("includes Access-Control-Allow-Origin on 400 response when CORS_ORIGIN is set", async () => {
    process.env.CORS_ORIGIN = "https://example.com";
    // Use a dedicated IP to avoid rate-limit state from other suites
    const res = await POST(makeRequest({}, { "cf-connecting-ip": "99.0.0.1" }));
    expect(res.status).toBe(400);
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe(
      "https://example.com",
    );
  });

  it("omits Access-Control-Allow-Origin when CORS_ORIGIN is not set", async () => {
    delete process.env.CORS_ORIGIN;
    const res = await POST(makeRequest({ query: "what is OTC?" }));
    expect(res.headers.get("Access-Control-Allow-Origin")).toBeNull();
  });
});
