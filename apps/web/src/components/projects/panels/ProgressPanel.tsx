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
    <div className="glass-card h-full rounded-xl border-l-4 border-l-[#508eff] p-6">
      <p className="mb-4 font-mono text-xs font-medium tracking-widest text-[#8e9192] uppercase">
        {label}
      </p>
      <div className="space-y-10">
        {progress && (
          <div>
            <div className="mb-2 flex justify-between">
              <span className="font-bold text-white">{progress.label}</span>
              <span className="font-mono text-[#508eff]">{progress.value}</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-[#1f2020]">
              <div className="h-full w-[95%] bg-[#508eff]" />
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 gap-4">
          {codeMetrics.map((m) => (
            <div
              key={m.value}
              className="rounded border border-[#444748]/20 bg-[#121212] p-4"
            >
              <span className="font-mono text-[#aec6ff]">{m.value}</span>
              <p className="mt-1 text-sm text-[#8e9192]">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
