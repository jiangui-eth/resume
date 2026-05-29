"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "@/hooks/useFaqBot";

interface Props {
  messages: ChatMessage[];
}

function TypingDots() {
  return (
    <span className="inline-flex gap-0.5 items-center h-4">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-current animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}

export function FaqBotMessages({ messages }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-3 px-4 text-center">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
          💬
        </div>
        <p className="text-sm text-muted-foreground">
          Ask me anything about <strong>OTC trading</strong> — pricing, KYC,
          settlement, and more.
        </p>
        <div className="flex flex-wrap gap-2 justify-center mt-1">
          {[
            "What is OTC trading?",
            "Minimum trade size?",
            "How long does KYC take?",
            "What are the fees?",
          ].map((q) => (
            <button
              key={q}
              className="text-xs px-2.5 py-1 rounded-full border border-border hover:bg-accent transition-colors"
              onClick={() => {
                // bubble up via a custom event so FaqBotWidget can pick it up
                window.dispatchEvent(
                  new CustomEvent("faqbot:suggest", { detail: q })
                );
              }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
              msg.role === "user"
                ? "bg-primary text-primary-foreground rounded-br-sm"
                : "bg-muted text-foreground rounded-bl-sm"
            }`}
          >
            {msg.role === "assistant" && msg.isStreaming && !msg.content ? (
              <TypingDots />
            ) : (
              <>
                <span className="whitespace-pre-wrap">{msg.content}</span>
                {msg.role === "assistant" && msg.isStreaming && (
                  <span className="ml-1 inline-block w-0.5 h-3.5 bg-current animate-pulse align-middle" />
                )}
              </>
            )}
            {msg.sources && msg.sources.length > 0 && (
              <div className="mt-2 pt-2 border-t border-border/40 space-y-1">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                  Sources
                </p>
                {msg.sources.map((s, i) => (
                  <p key={i} className="text-[11px] text-muted-foreground">
                    · {s.question}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
