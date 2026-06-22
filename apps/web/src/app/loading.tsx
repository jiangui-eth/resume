export default function GlobalLoading() {
  return (
    <div className="bg-ds-bg flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="border-ds-border border-t-ds-accent h-10 w-10 animate-spin rounded-full border-4"
          aria-hidden="true"
        />
        <p className="text-ds-muted font-mono text-sm">Loading…</p>
      </div>
    </div>
  );
}
