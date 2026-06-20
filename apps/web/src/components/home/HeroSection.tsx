import type { JSX } from 'react'

import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import profileData from '@/data/profile.json'

export default async function HeroSection(): Promise<JSX.Element> {
  const t = await getTranslations()

  return (
    <section
      id="home"
      className="grid-bg relative flex min-h-[921px] flex-col items-center justify-center overflow-hidden px-6 py-20"
      aria-label="Hero"
    >
      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#121414]/50 to-[#121414]"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-4 inline-block rounded-full border border-[#aec6ff]/30 bg-[#aec6ff]/5 px-2 py-1">
          <span className="font-mono text-sm leading-[1.4] font-medium tracking-[0.15em] text-[#aec6ff] uppercase">
            {t('profile.headline')}
          </span>
        </div>

        {/* H1 */}
        <h1 className="mb-4 text-[64px] leading-[1.1] font-extrabold tracking-[-0.04em] text-[#e3e2e2]">
          {profileData.name}
          {' '}
          <span className="text-[#508eff]">|</span>
          <br className="hidden md:block" />
          {' '}
          {t('hero.tagline')}
        </h1>

        {/* Subtext */}
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-[1.6] text-[#8e9192]">
          {t('profile.summary')}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={'/projects' as import('next').Route}
            className="rounded-lg bg-[#508eff] px-10 py-4 text-2xl leading-[1.3] font-semibold tracking-[-0.01em] text-[#00275e] transition-all hover:shadow-[0_0_30px_rgba(80,142,255,0.4)]"
          >
            {t('hero.viewProjects')}
          </Link>
          <a
            href="#contact"
            className="rounded-lg border border-[#444748] px-10 py-4 text-2xl leading-[1.3] font-semibold tracking-[-0.01em] text-[#e3e2e2] transition-all hover:border-[#aec6ff]"
          >
            {t('hero.getInTouch')}
          </a>
        </div>
      </div>

      {/* Glow orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-[#aec6ff]/10 blur-[120px]"
      />
    </section>
  )
}
