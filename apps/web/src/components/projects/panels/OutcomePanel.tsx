import type { JSX } from "react";
import type { ProjectBlockData } from "../types";

export function OutcomePanel({
  project,
}: {
  project: ProjectBlockData;
}): JSX.Element {
  const label = project.metricsLabel ?? "Outcome Metrics";

  return (
    <div className="glass-card overflow-hidden rounded-xl bg-ds-surface p-6">
      <p className="text-ds-muted mb-4 font-mono text-xs font-medium tracking-widest uppercase">
        {label}
      </p>
      <div className="space-y-4">
        {project.metrics.map((m) => (
          <div key={m.label} className="flex items-center gap-4">
            <span className="text-display-large leading-none text-white">
              {m.value}
            </span>
            <span className="text-ds-muted text-sm leading-snug">
              {m.label}
            </span>
          </div>
        ))}
        {project.quote && (
          <div className="border-ds-accent/20 bg-ds-accent/10 rounded border p-4">
            <p className="text-ds-accent font-mono text-sm">
              &ldquo;
              {project.quote}
              &rdquo;
            </p>
          </div>
        )}
      </div>
      <div className="mt-6 grid grid-cols-4 gap-2">
        <div className="bg-ds-accent h-1 rounded" />
        <div className="bg-ds-accent h-1 rounded" />
        <div className="bg-ds-accent h-1 rounded" />
        <div className="bg-ds-border-2 h-1 rounded" />
      </div>
    </div>
  );
}
