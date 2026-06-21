'use client'

// Sentry (configured in next.config.ts) automatically captures errors
// forwarded to this boundary — no manual logging needed here.

export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#121414] px-6 text-center">
      <h1 className="text-[32px] leading-[1.2] font-bold tracking-[-0.02em] text-[#e3e2e2]">
        Something went wrong
      </h1>
      <p className="max-w-md text-base text-[#8e9192]">
        An unexpected error occurred. You can try again or refresh the page.
      </p>
      <button
        type="button"
        onClick={reset}
        className="inline-flex items-center gap-2 rounded bg-[#508eff] px-6 py-3 font-mono text-sm font-bold text-[#00275e] transition-all hover:brightness-110"
      >
        Try again
      </button>
    </div>
  )
}
