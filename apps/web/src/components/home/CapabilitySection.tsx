import type { JSX } from 'react'

import type { Capability, Profile } from '@/types/profile'
import { getTranslations } from 'next-intl/server'
import SectionWrapper from '@/components/ui/SectionWrapper'
import profileData from '@/data/profile.json'

const capabilities = (profileData as Profile).capabilities

// ── CapabilityCard ─────────────────────────────────────────────────────────────

function CapabilityCard({ icon, title, bullets }: Capability): JSX.Element {
  return (
    <article className="group glass-card relative flex flex-col gap-6 overflow-hidden p-10">
      {/* Glow orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -right-12 h-24 w-24 rounded-full bg-[#aec6ff]/10 blur-2xl transition-colors group-hover:bg-[#aec6ff]/20"
      />

      {/* Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#aec6ff]/20 bg-[#aec6ff]/10 transition-all group-hover:border-[#aec6ff]/50">
        <span
          className="material-symbols-outlined text-[28px] text-[#508eff]"
          style={{ fontVariationSettings: '\'FILL\' 1' }}
          aria-hidden="true"
        >
          {icon}
        </span>
      </div>

      {/* Content */}
      <div>
        <h4 className="mb-2 text-2xl leading-[1.3] font-semibold tracking-[-0.01em] text-[#e3e2e2]">
          {title}
        </h4>
        <ul className="flex flex-col gap-2" role="list">
          {bullets.map(bullet => (
            <li
              key={bullet}
              className="flex items-center gap-2 font-mono text-sm leading-[1.4] font-medium tracking-[0.02em] text-[#8e9192]"
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#508eff]"
                aria-hidden="true"
              />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

// ── CapabilitySection ──────────────────────────────────────────────────────────

export default async function CapabilitySection(): Promise<JSX.Element> {
  const t = await getTranslations('capabilities')

  return (
    <section
      id="capabilities"
      className="relative overflow-hidden bg-[#121414] py-20"
      aria-label={t('title')}
    >
      {/* Grid background */}
      <div
        aria-hidden="true"
        className="grid-bg pointer-events-none absolute inset-0 opacity-30"
      />
      {/* Top fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-32 w-full bg-linear-to-b from-[#121414] to-transparent"
      />

      <SectionWrapper as="div" className="relative z-10">
        {/* Section header */}
        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#aec6ff]/20 bg-[#aec6ff]/5 px-2 py-1">
            <span
              className="h-2 w-2 animate-pulse rounded-full bg-[#aec6ff]"
              aria-hidden="true"
            />
            <span className="font-mono text-sm leading-[1.4] font-medium tracking-[0.15em] text-[#aec6ff] uppercase">
              {t('badge')}
            </span>
          </div>
          <h3 className="mb-1 text-[64px] leading-[1.1] font-extrabold tracking-[-0.04em] text-[#e3e2e2]">
            {t('title')}
          </h3>
          <p className="max-w-2xl text-lg leading-[1.6] text-[#8e9192]">
            {t('description')}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map(cap => (
            <CapabilityCard key={cap.title} {...cap} />
          ))}
        </div>
      </SectionWrapper>
    </section>
  )
}
