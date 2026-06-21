'use client'

import type { JSX } from 'react'
import type { Experience } from '@/types/experience'

import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import TechTag from '@/components/ui/TechTag'
import { formatDate } from '@/lib/utils'

interface TimelineCardProps {
  experience: Experience
  index: number
  side: 'left' | 'right'
}

interface TimelineCardArticleProps {
  experience: Experience
  isPresent: boolean
  startLabel: string
  endLabel: string
}

// Lightweight IntersectionObserver hook — replaces framer-motion/useInView.
// Falls back to true when IntersectionObserver is unavailable (SSR / JSDOM).
function useInView(
  ref: React.RefObject<Element | null>,
  { once = true, amount = 0 }: { once?: boolean, amount?: number } = {},
): boolean {
  const [inView, setInView] = useState(
    typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined')
      return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once)
            observer.disconnect()
        }
        else if (!once) {
          setInView(false)
        }
      },
      { threshold: amount },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, once, amount])

  return inView
}

function TimelineCardArticle({
  experience,
  isPresent,
  startLabel,
  endLabel,
}: TimelineCardArticleProps): JSX.Element {
  return (
    <article className="glass-card rounded-xl p-6">
      {/* Mobile date/company header */}
      <div className="mb-4 md:hidden">
        <p className="text-sm font-medium text-[#aec6ff]">
          {startLabel}
          {' '}
          –
          {' '}
          <span className={isPresent ? 'font-semibold' : 'text-white/60'}>
            {endLabel}
          </span>
        </p>
        <p className="mt-0.5 text-base font-semibold text-white">
          {experience.company}
        </p>
      </div>

      {/* Role label */}
      <p className="mb-4 text-xs font-medium tracking-wider text-[#8e9192] uppercase">
        {experience.title}
      </p>

      {/* Highlight badge */}
      {experience.highlight
        ? (
            <span className="mb-4 inline-block rounded border border-[#508eff]/30 px-2 py-0.5 font-mono text-xs text-[#508eff]">
              {experience.highlight}
            </span>
          )
        : null}

      {/* Bullet list */}
      <ul className="mb-4 space-y-2">
        {experience.responsibilities.map(responsibility => (
          <li
            key={responsibility}
            className="flex items-start gap-2 text-sm text-white/60"
          >
            <span
              aria-hidden="true"
              className="material-symbols-outlined shrink-0 text-[#aec6ff]"
              style={{ fontSize: '16px', lineHeight: '1.5' }}
            >
              arrow_right
            </span>
            <span>{responsibility}</span>
          </li>
        ))}
      </ul>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2">
        {experience.techTags.map(tag => (
          <TechTag key={tag} label={tag} />
        ))}
      </div>
    </article>
  )
}

export default function TimelineCard({
  experience,
  index,
  side,
}: TimelineCardProps): JSX.Element {
  const t = useTranslations('experience')
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const isPresent = experience.period.end === 'present'
  const startLabel = formatDate(experience.period.start)
  const endLabel = isPresent ? t('present') : formatDate(experience.period.end)
  const isCardRight = side === 'left'

  return (
    <div
      ref={ref}
      className={`flex flex-col ${isCardRight ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 transition-[opacity,transform] duration-500 ease-out md:gap-0 ${
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {/* Date/company panel — desktop only */}
      <div
        className={`hidden w-1/2 px-8 md:flex ${isCardRight ? 'justify-end' : 'justify-start'}`}
      >
        <div className={isCardRight ? 'text-right' : 'text-left'}>
          <p className="text-sm font-medium text-[#aec6ff]">
            {startLabel}
            {' '}
            –
            {' '}
            <span
              className={
                isPresent ? 'font-semibold text-[#aec6ff]' : 'text-white/60'
              }
            >
              {endLabel}
            </span>
          </p>
          {experience.companyUrl
            ? (
                <a
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-semibold text-white transition-colors hover:text-[#aec6ff]"
                >
                  {experience.company}
                </a>
              )
            : (
                <p className="text-base font-semibold text-white">
                  {experience.company}
                </p>
              )}
        </div>
      </div>

      {/* Center dot */}
      <div className="relative z-10 shrink-0">
        <span
          aria-hidden="true"
          className={`block h-4 w-4 rounded-full border-4 border-[#121414] ring-4 ring-[#aec6ff]/20 ${
            isPresent ? 'animate-pulse bg-[#aec6ff]' : 'bg-[#aec6ff]'
          }`}
        />
      </div>

      {/* Card */}
      <div className="w-full px-0 md:w-1/2 md:px-8">
        <TimelineCardArticle
          experience={experience}
          isPresent={isPresent}
          startLabel={startLabel}
          endLabel={endLabel}
        />
      </div>
    </div>
  )
}
