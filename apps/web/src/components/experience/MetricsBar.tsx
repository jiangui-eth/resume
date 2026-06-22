"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";

export default function MetricsBar(): JSX.Element {
  const t = useTranslations("impactMetrics");

  const metrics = [
    {
      value: "14x",
      titleKey: "seoGrowth.title",
      descKey: "seoGrowth.description",
    },
    {
      value: "80%",
      titleKey: "buildSpeed.title",
      descKey: "buildSpeed.description",
    },
    {
      value: "1.8s",
      titleKey: "lcpOptimization.title",
      descKey: "lcpOptimization.description",
    },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {metrics.map((metric) => (
        <article
          key={metric.titleKey}
          className="glass-card border-l-ds-accent-vivid rounded-xl border-l-4 p-6"
        >
          <p className="text-ds-accent-vivid text-4xl font-bold">
            {metric.value}
          </p>
          <p className="text-ds-muted mt-2 text-xs font-medium tracking-widest uppercase">
            {t(metric.titleKey)}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            {t(metric.descKey)}
          </p>
        </article>
      ))}
    </div>
  );
}
