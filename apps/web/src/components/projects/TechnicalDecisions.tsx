'use client'

import { useTranslations } from 'next-intl'

export interface TechnicalDecision {
  title: string
  explanation: string
}

interface TechnicalDecisionsProps {
  decisions: TechnicalDecision[]
}

export default function TechnicalDecisions({
  decisions,
}: TechnicalDecisionsProps) {
  const t = useTranslations('technicalDecisions')

  if (decisions.length === 0)
    return null

  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="mb-2 text-2xl font-semibold tracking-[-0.01em] text-white">
        {t('title')}
      </h3>
      <ul className="list-disc space-y-1 pl-4 text-[#8e9192]">
        {decisions.map(decision => (
          <li key={decision.title}>
            <span className="text-[#aec6ff]">{decision.title}</span>
            {' '}
            {decision.explanation}
          </li>
        ))}
      </ul>
    </div>
  )
}
