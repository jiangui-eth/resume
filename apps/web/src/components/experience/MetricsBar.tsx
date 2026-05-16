import type { JSX } from "react";

import { IMPACT_METRICS } from "@/data/impact-metrics";

export default function MetricsBar(): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {IMPACT_METRICS.map((metric) => (
        <article
          key={metric.title}
          className="glass-card p-6 rounded-xl border-l-4 border-l-[#508eff]"
        >
          <p className="text-4xl font-bold text-[#508eff]">{metric.value}</p>
          <p className="mt-2 text-xs font-medium uppercase tracking-widest text-[#8e9192]">
            {metric.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            {metric.description}
          </p>
        </article>
      ))}
    </div>
  );
}
