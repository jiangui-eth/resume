'use client'

import type { KeyboardEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useFaqBot } from '@/hooks/useFaqBot'
import { FaqBotMessages } from './FaqBotMessages'

export function FaqBotWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { messages, isLoading, error, sendMessage, clearHistory } = useFaqBot()

  // Listen for suggestion clicks from FaqBotMessages
  useEffect(() => {
    const handler = (e: Event) => {
      const suggestion = (e as CustomEvent<string>).detail
      setInput(suggestion)
      inputRef.current?.focus()
    }
    window.addEventListener('faqbot:suggest', handler)
    return () => window.removeEventListener('faqbot:suggest', handler)
  }, [])

  // Auto-focus input when panel opens
  useEffect(() => {
    if (!open)
      return
    const timer = setTimeout(() => inputRef.current?.focus(), 80)
    return () => clearTimeout(timer)
  }, [open])

  const handleSend = async () => {
    const q = input.trim()
    if (!q || isLoading)
      return
    setInput('')
    await sendMessage(q)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void handleSend()
    }
  }

  return (
    <>
      {/* ── Floating action button ─────────────────────────────────────── */}
      <button
        aria-label={open ? 'Close OTC FAQ Bot' : 'Open OTC FAQ Bot'}
        onClick={() => setOpen(v => !v)}
        className={`fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-2xl shadow-lg transition-all duration-300 ${
          open
            ? 'rotate-90 bg-muted text-foreground'
            : 'bg-primary text-primary-foreground hover:scale-105'
        }`}
      >
        {open ? '✕' : '💬'}
      </button>

      {/* ── Chat panel ────────────────────────────────────────────────── */}
      <div
        aria-hidden={!open}
        className={`fixed right-6 bottom-24 z-50 flex max-h-[520px] w-[340px] origin-bottom-right flex-col rounded-2xl border border-border bg-background shadow-2xl transition-all duration-300 ${
          open
            ? 'pointer-events-auto scale-100 opacity-100'
            : 'pointer-events-none scale-95 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-2xl border-b border-border bg-muted/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="text-sm font-semibold">OTC FAQ Assistant</span>
          </div>
          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <button
                onClick={clearHistory}
                title="Clear conversation"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Clear
              </button>
            )}
            <button
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="text-lg leading-none text-muted-foreground transition-colors hover:text-foreground"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Messages area */}
        <FaqBotMessages messages={messages} />

        {/* Error banner */}
        {error && (
          <div className="mx-3 mb-2 rounded-lg bg-destructive/10 px-3 py-1.5 text-xs text-destructive">
            {error}
          </div>
        )}

        {/* RAG badge */}
        <div className="flex items-center gap-1.5 px-3 pb-1">
          <span className="text-[10px] text-muted-foreground">
            Powered by
            {' '}
            <span className="font-mono text-primary">
              pgvector + BM25 + Cohere Rerank
            </span>
          </span>
        </div>

        {/* Input area */}
        <div className="rounded-b-2xl border-t border-border p-3 pt-1">
          <div className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about OTC trading…"
              disabled={isLoading}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50"
            />
            <button
              onClick={() => void handleSend()}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-sm text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLoading
                ? (
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  )
                : (
                    '↑'
                  )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
