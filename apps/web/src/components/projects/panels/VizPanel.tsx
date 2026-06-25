import type { JSX } from "react";
import type { ProjectBlockData } from "../types";

export function VizPanel({
  project,
}: {
  project: ProjectBlockData;
}): JSX.Element {
  const label = project.metricsLabel ?? "Visualization Engine";

  return (
    <div className="glass-card h-full rounded-xl p-6">
      <p className="text-ds-muted mb-4 font-mono text-xs font-medium tracking-widest uppercase">
        {label}
      </p>
      <div className="group border-ds-border-2/30 relative flex aspect-video items-center justify-center overflow-hidden rounded border bg-black/40">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(var(--ds-accent) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <span
          className="material-symbols-outlined z-10 text-display-large transition-transform group-hover:scale-110"
          style={{ color: "var(--ds-accent)" }}
        >
          hub
        </span>
        <div className="border-ds-border-2/20 bg-ds-surface-2/80 text-ds-muted absolute right-3 bottom-3 left-3 rounded border px-2 py-1 font-mono text-xs">
          AntV/X6 Orchestration Graph • 60fps
        </div>
      </div>
      <div className="mt-10 space-y-4">
        {project.metrics.map((m) => (
          <div
            key={m.label}
            className="border-ds-border-2/20 flex justify-between border-b pb-2"
          >
            <span className="text-ds-muted">{m.label}</span>
            <span className="font-mono text-white">{m.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
