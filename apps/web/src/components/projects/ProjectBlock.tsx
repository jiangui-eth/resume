import type { JSX } from 'react'

import type { ProjectBlockData } from './types'
import { GridPanel } from './panels/GridPanel'
import { OutcomePanel } from './panels/OutcomePanel'
import { ProgressPanel } from './panels/ProgressPanel'
import { VizPanel } from './panels/VizPanel'

import TechnicalDecisions from './TechnicalDecisions'

// Re-export types so existing importers don't need to change
export type {
  PanelType,
  ProjectBlockData,
  ProjectImage,
  ProjectLink,
  ProjectMetric,
} from './types'

const LINK_LABELS: Record<'github' | 'demo' | 'case-study', string> = {
  'github': 'GitHub',
  'demo': 'Demo',
  'case-study': 'Case Study',
}

function VisualPanel({ project }: { project: ProjectBlockData }): JSX.Element {
  switch (project.panelType) {
    case 'progress':
      return <ProgressPanel project={project} />
    case 'outcome':
      return <OutcomePanel project={project} />
    case 'viz':
      return <VizPanel project={project} />
    default:
      return <GridPanel project={project} />
  }
}

export default function ProjectBlock({
  project,
}: {
  project: ProjectBlockData
}): JSX.Element {
  const isEven = project.order % 2 === 0
  const badge = project.domainBadge ?? project.domainTags.join(' / ')

  const TextColumn = (
    <div
      className={isEven ? 'order-1 md:order-2 md:col-span-7' : 'md:col-span-7'}
    >
      <div className="mb-2 flex items-center gap-2">
        {project.icon && (
          <span
            className="material-symbols-outlined text-[#aec6ff]"
            style={{ fontVariationSettings: '\'FILL\' 1' }}
          >
            {project.icon}
          </span>
        )}
        <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-xs text-[#aec6ff]">
          {badge}
        </span>
      </div>

      <h2 className="mb-4 text-[32px] leading-[1.2] font-bold tracking-[-0.02em] text-white">
        {project.name}
      </h2>

      <div className="space-y-4 text-[18px] leading-[1.6] text-[#c4c7c7]">
        <p>{project.background}</p>
        {project.technicalDecisions.length > 0 && (
          <TechnicalDecisions decisions={project.technicalDecisions} />
        )}
      </div>

      {project.links.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.map(link => (
            <a
              key={`${link.type}-${link.url}`}
              href={link.url}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#333333] px-4 py-2 text-sm font-medium text-white/80 transition-all hover:border-[#508eff] hover:text-white"
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel={link.url.startsWith('http') ? 'noreferrer' : undefined}
            >
              {LINK_LABELS[link.type]}
            </a>
          ))}
        </div>
      )}
    </div>
  )

  const VisualColumn = (
    <div
      className={isEven ? 'order-2 md:order-1 md:col-span-5' : 'md:col-span-5'}
    >
      <VisualPanel project={project} />
    </div>
  )

  return (
    <article className="mb-20 grid grid-cols-1 items-start gap-6 md:grid-cols-12">
      {isEven
        ? (
            <>
              {VisualColumn}
              {TextColumn}
            </>
          )
        : (
            <>
              {TextColumn}
              {VisualColumn}
            </>
          )}
    </article>
  )
}
