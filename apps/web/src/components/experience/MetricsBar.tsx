'use client'

import type { JSX } from 'react'
import { useTranslations } from 'next-intl'

export default function MetricsBar(): JSX.Element {
  const t = useTranslations('impactMetrics')

  const metrics = [
    {
      value: '14x',
      titleKey: 'seoGrowth.title',
      descKey: 'seoGrowth.description',
    },
    {
      value: '80%',
      titleKey: 'buildSpeed.title',
      descKey: 'buildSpeed.description',
    },
    {
      value: '1.8s',
      titleKey: 'lcpOptimization.title',
      descKey: 'lcpOptimization.description',
    },
  ] as const

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {metrics.map(metric => (
        <article
          key={metric.titleKey}
          className="glass-card rounded-xl border-l-4 border-l-[#508eff] p-6"
        >
          <p className="text-4xl font-bold text-[#508eff]">{metric.value}</p>
          <p className="mt-2 text-xs font-medium tracking-widest text-[#8e9192] uppercase">
            {t(metric.titleKey)}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            {t(metric.descKey)}
          </p>
        </article>
      ))}
    </div>
  )
}
