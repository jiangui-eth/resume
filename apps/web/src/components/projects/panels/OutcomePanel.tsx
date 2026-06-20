import type { JSX } from 'react'
import type { ProjectBlockData } from '../types'

export function OutcomePanel({
  project,
}: {
  project: ProjectBlockData
}): JSX.Element {
  const label = project.metricsLabel ?? 'Outcome Metrics'

  return (
    <div className="glass-card overflow-hidden rounded-xl bg-[#1b1c1c] p-6">
      <p className="mb-4 font-mono text-xs font-medium tracking-widest text-[#8e9192] uppercase">
        {label}
      </p>
      <div className="space-y-4">
        {project.metrics.map(m => (
          <div key={m.label} className="flex items-center gap-4">
            <span className="text-[64px] leading-none font-extrabold text-white">
              {m.value}
            </span>
            <span className="text-sm leading-snug text-[#8e9192]">
              {m.label}
            </span>
          </div>
        ))}
        {project.quote && (
          <div className="rounded border border-[#aec6ff]/20 bg-[#aec6ff]/10 p-4">
            <p className="font-mono text-sm text-[#aec6ff]">
              &ldquo;
              {project.quote}
              &rdquo;
            </p>
          </div>
        )}
      </div>
      <div className="mt-6 grid grid-cols-4 gap-2">
        <div className="h-1 rounded bg-[#aec6ff]" />
        <div className="h-1 rounded bg-[#aec6ff]" />
        <div className="h-1 rounded bg-[#aec6ff]" />
        <div className="h-1 rounded bg-[#444748]" />
      </div>
    </div>
  )
}
