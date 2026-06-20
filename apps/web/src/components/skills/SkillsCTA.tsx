'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { track } from '@/lib/analytics'

export default function SkillsCTA() {
  const t = useTranslations('skillsCTA')

  return (
    <SectionWrapper className="pb-20">
      <div className="glass-card relative flex min-h-75 items-center overflow-hidden rounded-xl p-10">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgVG9u5X8oO_yikgePgL6n5JS4Luxeot5xhFtOuelsoqMAQ7gtLAbf7OHejdlYkwLutrtO_znns_LGW3M3UkP8mvz_KOprrTlM84cMh-itZeXiEdC-m247hM7LGc3d6TOVk7ep0uH0dDn7Oo5BL2xSSgEbZX5NEJtV-4vvS5ldFPUaz5xQh83R5FMGktbN1ABJkM3Q9ednZS666MtFtQTdDTWQn-KGLd4zol12mdOJiQz994VxTlHvY9_sWhCh0NCp9HaoSt85sQ"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none object-cover opacity-10"
        />
        <div className="relative z-10 max-w-2xl">
          <SectionHeader title={t('title')} subtitle={t('description')} />
          <a
            href="mailto:jiangui.eth@gmail.com"
            onClick={() =>
              track('click_get_in_touch', { source: 'skills_cta' })}
            className="inline-flex items-center gap-2 rounded-lg bg-[#508eff] px-6 py-3 font-mono text-sm font-bold text-[#00275e] transition-all hover:shadow-[0_0_30px_rgba(80,142,255,0.4)]"
          >
            {t('contactMe')}
          </a>
        </div>
      </div>
    </SectionWrapper>
  )
}
