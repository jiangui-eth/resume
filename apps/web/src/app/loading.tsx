export default function GlobalLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#121414]">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-[#333333] border-t-[#aec6ff]"
          aria-hidden="true"
        />
        <p className="font-mono text-sm text-[#8e9192]">Loading…</p>
      </div>
    </div>
  )
}
