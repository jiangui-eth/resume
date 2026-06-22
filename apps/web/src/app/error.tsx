"use client";

// Sentry (configured in next.config.ts) automatically captures errors
// forwarded to this boundary — no manual logging needed here.

export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-ds-bg flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-ds-fg text-[32px] leading-[1.2] font-bold tracking-[-0.02em]">
        Something went wrong
      </h1>
      <p className="text-ds-muted max-w-md text-base">
        An unexpected error occurred. You can try again or refresh the page.
      </p>
      <button
        type="button"
        onClick={reset}
        className="bg-ds-accent-vivid text-ds-accent-dim inline-flex items-center gap-2 rounded px-6 py-3 font-mono text-sm font-bold transition-all hover:brightness-110"
      >
        Try again
      </button>
    </div>
  );
}
