'use client'

import type { JSX } from 'react'
import { useTranslations } from 'next-intl'
import SectionWrapper from '@/components/ui/SectionWrapper'

export default function SkillsHero(): JSX.Element {
  const t = useTranslations('skillsHero')

  return (
    <SectionWrapper className="relative overflow-hidden pt-10 pb-20">
      <div className="relative z-10 max-w-3xl pt-20">
        <span className="mb-2 block font-mono text-sm tracking-widest text-[#aec6ff] uppercase">
          {t('badge')}
        </span>
        <h1 className="mb-4 text-[64px] leading-[1.1] font-extrabold tracking-[-0.04em] text-white">
          {t('title')}
        </h1>
        <p className="mb-6 max-w-2xl text-lg leading-relaxed text-[#8e9192]">
          {t('description')}
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 rounded-lg border border-[#444748]/50 bg-[#1b1c1c] px-4 py-2">
            <span
              className="material-symbols-outlined text-[#aec6ff]"
              style={{ fontVariationSettings: '\'FILL\' 1' }}
            >
              terminal
            </span>
            <span className="font-mono text-sm">{t('systemArchitecture')}</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-[#444748]/50 bg-[#1b1c1c] px-4 py-2">
            <span
              className="material-symbols-outlined text-[#aec6ff]"
              style={{ fontVariationSettings: '\'FILL\' 1' }}
            >
              speed
            </span>
            <span className="font-mono text-sm">{t('performanceFirst')}</span>
          </div>
        </div>
      </div>

      {/* Decorative hexagon — right side, desktop only */}
      <div
        className="pointer-events-none absolute top-0 right-0 hidden h-full w-1/3 opacity-20 lg:block"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full fill-none stroke-current text-[#aec6ff]"
        >
          <path
            d="M 50,5 L 95,30 L 95,70 L 50,95 L 5,70 L 5,30 Z"
            strokeWidth="0.5"
          />
          <circle cx="50" cy="50" fill="currentColor" r="2" />
          <path
            d="M 50,5 L 50,50 M 95,30 L 50,50 M 95,70 L 50,50 M 50,95 L 50,50 M 5,70 L 50,50 M 5,30 L 50,50"
            strokeWidth="0.2"
          />
        </svg>
      </div>
    </SectionWrapper>
  )
}
