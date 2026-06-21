import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useFaqBot } from "../useFaqBot";

// ── Mock fetch with SSE streaming ─────────────────────────────────────────

function makeSSEStream(events: string[]) {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      for (const event of events) {
        controller.enqueue(encoder.encode(`data: ${event}\n\n`));
      }
      controller.close();
    },
  });
}

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("useFaqBot", () => {
  it("starts with empty state", () => {
    const { result } = renderHook(() => useFaqBot());
    expect(result.current.messages).toHaveLength(0);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("sends a user message and receives a streamed assistant reply", async () => {
    const events = [
      JSON.stringify({ delta: "Hello" }),
      JSON.stringify({ delta: " there!" }),
      JSON.stringify({
        sources: [{ question: "What is OTC?", category: "basics" }],
      }),
      "[DONE]",
    ];

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        body: makeSSEStream(events),
      }),
    );

    const { result } = renderHook(() => useFaqBot());

    await act(async () => {
      await result.current.sendMessage("What is OTC trading?");
    });

    const msgs = result.current.messages;
    expect(msgs).toHaveLength(2);
    expect(msgs[0].role).toBe("user");
    expect(msgs[0].content).toBe("What is OTC trading?");
    expect(msgs[1].role).toBe("assistant");
    expect(msgs[1].content).toBe("Hello there!");
    expect(msgs[1].sources).toHaveLength(1);
    expect(msgs[1].isStreaming).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it("sets error when server returns non-ok response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        body: null,
      }),
    );

    const { result } = renderHook(() => useFaqBot());

    await act(async () => {
      await result.current.sendMessage("test query");
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.isLoading).toBe(false);
  });

  it("handles error event in SSE stream", async () => {
    const events = [
      JSON.stringify({ error: "Supabase connection failed" }),
      "[DONE]",
    ];

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        body: makeSSEStream(events),
      }),
    );

    const { result } = renderHook(() => useFaqBot());

    await act(async () => {
      await result.current.sendMessage("minimum trade size?");
    });

    expect(result.current.error).toBe("Supabase connection failed");
  });

  it("clearHistory resets all state", async () => {
    const events = [JSON.stringify({ delta: "hi" }), "[DONE]"];
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, body: makeSSEStream(events) }),
    );

    const { result } = renderHook(() => useFaqBot());

    await act(async () => {
      await result.current.sendMessage("hello");
    });

    expect(result.current.messages).toHaveLength(2);

    act(() => {
      result.current.clearHistory();
    });

    expect(result.current.messages).toHaveLength(0);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it("does not send empty queries", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() => useFaqBot());

    await act(async () => {
      await result.current.sendMessage("   ");
    });

    expect(fetchMock).not.toHaveBeenCalled();
    expect(result.current.messages).toHaveLength(0);
  });
});
