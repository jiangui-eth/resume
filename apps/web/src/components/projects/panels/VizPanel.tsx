import type { JSX } from 'react'
import type { ProjectBlockData } from '../types'

export function VizPanel({
  project,
}: {
  project: ProjectBlockData
}): JSX.Element {
  const label = project.metricsLabel ?? 'Visualization Engine'

  return (
    <div className="glass-card h-full rounded-xl p-6">
      <p className="mb-4 font-mono text-xs font-medium tracking-widest text-[#8e9192] uppercase">
        {label}
      </p>
      <div className="group relative flex aspect-video items-center justify-center overflow-hidden rounded border border-[#444748]/30 bg-black/40">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#aec6ff 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <span className="material-symbols-outlined z-10 text-[60px] text-[#aec6ff] transition-transform group-hover:scale-110">
          hub
        </span>
        <div className="absolute right-3 bottom-3 left-3 rounded border border-[#444748]/20 bg-[#1f2020]/80 px-2 py-1 font-mono text-xs text-[#8e9192]">
          AntV/X6 Orchestration Graph • 60fps
        </div>
      </div>
      <div className="mt-10 space-y-4">
        {project.metrics.map(m => (
          <div
            key={m.label}
            className="flex justify-between border-b border-[#444748]/20 pb-2"
          >
            <span className="text-[#8e9192]">{m.label}</span>
            <span className="font-mono text-white">{m.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
