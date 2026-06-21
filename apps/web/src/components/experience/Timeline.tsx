import type { JSX } from 'react'

import type { Experience } from '@/types/experience'
import experiencesData from '@/data/experiences.json'

import TimelineCard from './TimelineCard'

const EXPERIENCES = experiencesData as Experience[]

export default function Timeline(): JSX.Element {
  return (
    <div id="timeline-placeholder" className="relative py-6 md:py-12">
      <div
        aria-hidden="true"
        className="timeline-line absolute top-0 left-1/2 hidden h-full -translate-x-1/2 md:block"
      />
      <div className="flex flex-col gap-12 md:gap-16">
        {EXPERIENCES.map((experience, index) => (
          <TimelineCard
            key={experience.id}
            experience={experience}
            index={index}
            side={index % 2 === 0 ? 'left' : 'right'}
          />
        ))}
      </div>
    </div>
  )
}
