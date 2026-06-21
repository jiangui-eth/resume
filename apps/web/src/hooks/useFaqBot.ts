'use client'

import { useCallback, useRef, useState } from 'react'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: { question: string, category: string }[]
  isStreaming?: boolean
}

interface UseFaqBotReturn {
  messages: ChatMessage[]
  isLoading: boolean
  error: string | null
  sendMessage: (query: string) => Promise<void>
  clearHistory: () => void
}

let msgCounter = 0
const uid = () => `msg-${++msgCounter}-${Date.now()}`

export function useFaqBot(): UseFaqBotReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const sendMessage = useCallback(
    async (query: string) => {
      if (!query.trim() || isLoading)
        return

      // Cancel any in-flight request
      abortRef.current?.abort()
      abortRef.current = new AbortController()

      const userMsg: ChatMessage = { id: uid(), role: 'user', content: query }
      const assistantMsgId = uid()

      setMessages(prev => [
        ...prev,
        userMsg,
        {
          id: assistantMsgId,
          role: 'assistant',
          content: '',
          isStreaming: true,
        },
      ])
      setIsLoading(true)
      setError(null)

      // Build history (exclude the placeholder assistant message we just added)
      const history = messages.map(m => ({
        role: m.role,
        content: m.content,
      }))

      try {
        const res = await fetch('/api/faq-bot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query, history }),
          signal: abortRef.current.signal,
        })

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`)
        }

        const reader = res.body!.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done)
            break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() ?? ''

          for (const line of lines) {
            if (!line.startsWith('data: '))
              continue
            const raw = line.slice(6).trim()
            if (raw === '[DONE]')
              break

            try {
              const parsed = JSON.parse(raw) as {
                delta?: string
                sources?: { question: string, category: string }[]
                error?: string
              }

              if (parsed.error) {
                setError(parsed.error)
                break
              }

              if (parsed.delta !== undefined) {
                setMessages(prev =>
                  prev.map(m =>
                    m.id === assistantMsgId
                      ? { ...m, content: m.content + parsed.delta }
                      : m,
                  ),
                )
              }

              if (parsed.sources) {
                setMessages(prev =>
                  prev.map(m =>
                    m.id === assistantMsgId
                      ? { ...m, sources: parsed.sources, isStreaming: false }
                      : m,
                  ),
                )
              }
            }
            catch {
              // skip malformed SSE line
            }
          }
        }
      }
      catch (err) {
        if ((err as Error).name === 'AbortError')
          return
        const msg
          = err instanceof Error ? err.message : 'Failed to reach FAQ bot'
        setError(msg)
        setMessages(prev =>
          prev.map(m =>
            m.id === assistantMsgId
              ? {
                  ...m,
                  content: 'Sorry, something went wrong. Please try again.',
                  isStreaming: false,
                }
              : m,
          ),
        )
      }
      finally {
        setMessages(prev =>
          prev.map(m =>
            m.id === assistantMsgId ? { ...m, isStreaming: false } : m,
          ),
        )
        setIsLoading(false)
      }
    },
    [messages, isLoading],
  )

  const clearHistory = useCallback(() => {
    abortRef.current?.abort()
    setMessages([])
    setError(null)
    setIsLoading(false)
  }, [])

  return { messages, isLoading, error, sendMessage, clearHistory }
}
