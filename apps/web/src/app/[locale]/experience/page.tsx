import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import MetricsBar from '@/components/experience/MetricsBar'

import Timeline from '@/components/experience/Timeline'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('experience')
  const description = t('description')
  return {
    title: 'Experience | jiangui.eth',
    description,
    keywords: [
      'engineering experience',
      'full-stack',
      'web3',
      'timeline',
      'career',
    ],
    openGraph: {
      title: 'Experience | jiangui.eth',
      description,
      url: '/experience',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'jiangui.eth Experience',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Experience | jiangui.eth',
      description,
    },
  }
}

export default async function ExperiencePage() {
  const t = await getTranslations('experience')

  return (
    <div className="min-h-screen bg-[#121414]">
      <section
        aria-label={`${t('badge')} header`}
        className="px-4 pt-[120px] pb-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#aec6ff]/30 bg-[#aec6ff]/10 px-4 py-1.5 text-sm font-medium text-[#aec6ff]">
              {t('badge')}
            </span>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              {t('title')}
              {' '}
              <span className="text-[#aec6ff]">{t('titleHighlight')}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-[#8e9192]">
              {t('description')}
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <Timeline />
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <MetricsBar />
        </div>
      </section>
    </div>
  )
}
