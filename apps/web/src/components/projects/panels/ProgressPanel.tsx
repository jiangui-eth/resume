import type { JSX } from "react";
import type { ProjectBlockData } from "../types";

export function ProgressPanel({
  project,
}: {
  project: ProjectBlockData;
}): JSX.Element {
  const [progress, ...codeMetrics] = project.metrics;
  const label = project.metricsLabel ?? "Growth & Performance";

  return (
    <div className="glass-card border-l-ds-accent-vivid h-full rounded-xl border-l-4 p-6">
      <p className="text-ds-muted mb-4 font-mono text-xs font-medium tracking-widest uppercase">
        {label}
      </p>
      <div className="space-y-10">
        {progress && (
          <div>
            <div className="mb-2 flex justify-between">
              <span className="font-bold text-white">{progress.label}</span>
              <span className="text-ds-accent-vivid font-mono">
                {progress.value}
              </span>
            </div>
            <div className="bg-ds-surface-2 h-1 w-full overflow-hidden rounded-full">
              <div className="bg-ds-accent-vivid h-full w-[95%]" />
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 gap-4">
          {codeMetrics.map((m) => (
            <div
              key={m.value}
              className="border-ds-border-2/20 bg-ds-bg rounded border p-4"
            >
              <span className="text-ds-accent font-mono">{m.value}</span>
              <p className="text-ds-muted mt-1 text-sm">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
