"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { useFaqBot } from "@/hooks/useFaqBot";
import { FaqBotMessages } from "./FaqBotMessages";

export function FaqBotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { messages, isLoading, error, sendMessage, clearHistory } =
    useFaqBot();

  // Listen for suggestion clicks from FaqBotMessages
  useEffect(() => {
    const handler = (e: Event) => {
      const suggestion = (e as CustomEvent<string>).detail;
      setInput(suggestion);
      inputRef.current?.focus();
    };
    window.addEventListener("faqbot:suggest", handler);
    return () => window.removeEventListener("faqbot:suggest", handler);
  }, []);

  // Auto-focus input when panel opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  const handleSend = async () => {
    const q = input.trim();
    if (!q || isLoading) return;
    setInput("");
    await sendMessage(q);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  return (
    <>
      {/* ── Floating action button ─────────────────────────────────────── */}
      <button
        aria-label={open ? "Close OTC FAQ Bot" : "Open OTC FAQ Bot"}
        onClick={() => setOpen((v) => !v)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl transition-all duration-300 ${
          open
            ? "bg-muted text-foreground rotate-90"
            : "bg-primary text-primary-foreground hover:scale-105"
        }`}
      >
        {open ? "✕" : "💬"}
      </button>

      {/* ── Chat panel ────────────────────────────────────────────────── */}
      <div
        aria-hidden={!open}
        className={`fixed bottom-24 right-6 z-50 w-[340px] max-h-[520px] rounded-2xl border border-border bg-background shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right ${
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border rounded-t-2xl bg-muted/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-semibold">OTC FAQ Assistant</span>
          </div>
          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <button
                onClick={clearHistory}
                title="Clear conversation"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear
              </button>
            )}
            <button
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors text-lg leading-none"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Messages area */}
        <FaqBotMessages messages={messages} />

        {/* Error banner */}
        {error && (
          <div className="mx-3 mb-2 px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive text-xs">
            {error}
          </div>
        )}

        {/* RAG badge */}
        <div className="px-3 pb-1 flex items-center gap-1.5">
          <span className="text-[10px] text-muted-foreground">
            Powered by{" "}
            <span className="font-mono text-primary">pgvector + BM25 + Cohere Rerank</span>
          </span>
        </div>

        {/* Input area */}
        <div className="p-3 pt-1 border-t border-border rounded-b-2xl">
          <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about OTC trading…"
              disabled={isLoading}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50"
            />
            <button
              onClick={() => void handleSend()}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              {isLoading ? (
                <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                "↑"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
