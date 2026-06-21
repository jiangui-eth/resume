"use client";

import type { ChatMessage } from "@/hooks/useFaqBot";
import { useEffect, useRef } from "react";

interface Props {
  messages: ChatMessage[];
}

function TypingDots() {
  return (
    <span className="inline-flex h-4 items-center gap-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-current"
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
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xl">
          💬
        </div>
        <p className="text-sm text-muted-foreground">
          Ask me anything about <strong>OTC trading</strong> — pricing, KYC,
          settlement, and more.
        </p>
        <div className="mt-1 flex flex-wrap justify-center gap-2">
          {[
            "What is OTC trading?",
            "Minimum trade size?",
            "How long does KYC take?",
            "What are the fees?",
          ].map((q) => (
            <button
              key={q}
              className="rounded-full border border-border px-2.5 py-1 text-xs transition-colors hover:bg-accent"
              onClick={() => {
                // bubble up via a custom event so FaqBotWidget can pick it up
                window.dispatchEvent(
                  new CustomEvent("faqbot:suggest", { detail: q }),
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
    <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
              msg.role === "user"
                ? "rounded-br-sm bg-primary text-primary-foreground"
                : "rounded-bl-sm bg-muted text-foreground"
            }`}
          >
            {msg.role === "assistant" && msg.isStreaming && !msg.content ? (
              <TypingDots />
            ) : (
              <>
                <span className="whitespace-pre-wrap">{msg.content}</span>
                {msg.role === "assistant" && msg.isStreaming && (
                  <span className="ml-1 inline-block h-3.5 w-0.5 animate-pulse bg-current align-middle" />
                )}
              </>
            )}
            {msg.sources && msg.sources.length > 0 && (
              <div className="mt-2 space-y-1 border-t border-border/40 pt-2">
                <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                  Sources
                </p>
                {msg.sources.map((s) => (
                  <p
                    key={s.question}
                    className="text-[11px] text-muted-foreground"
                  >
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
