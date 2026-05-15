import Image from "next/image";

import MetricBadge from "./MetricBadge";
import TechnicalDecisions, { type TechnicalDecision } from "./TechnicalDecisions";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectLink {
  type: "github" | "demo" | "case-study";
  url: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
}

export type PanelType = "grid" | "progress" | "outcome" | "viz";

export interface ProjectBlockData {
  id: string;
  name: string;
  tagline: string;
  domainTags: string[];
  domainBadge?: string;
  icon?: string;
  panelType?: PanelType;
  metricsLabel?: string;
  quote?: string;
  background: string;
  technicalDecisions: TechnicalDecision[];
  metrics: ProjectMetric[];
  images: ProjectImage[];
  links: ProjectLink[];
  techTags: string[];
  featured: boolean;
  order: number;
}

const LINK_LABELS: Record<ProjectLink["type"], string> = {
  github: "GitHub",
  demo: "Demo",
  "case-study": "Case Study",
};

function GridPanel({ project }: { project: ProjectBlockData }) {
  const image = project.images[0];
  const label = project.metricsLabel ?? "Performance Metrics";

  return (
    <div className="glass-card p-6 rounded-xl flex flex-col h-full">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-[#8e9192] mb-4">
        {label}
      </p>
      {project.metrics.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {project.metrics.map((metric) => (
            <MetricBadge
              key={`${metric.label}-${metric.value}`}
              value={metric.value}
              label={metric.label}
            />
          ))}
        </div>
      )}
      {image?.src ? (
        <div className="relative mt-6 overflow-hidden rounded-lg aspect-video">
          <Image
            src={image.src}
            alt={image.alt || project.name}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
          />
        </div>
      ) : (
        project.metrics.length === 0 && (
          <div className="mt-6 flex aspect-video items-center justify-center rounded-lg border border-[#333333]/30 bg-[#121414]">
            <div className="text-center">
              <div className="text-sm font-medium uppercase tracking-[0.3em] text-white/30">
                Visual Pending
              </div>
              <div className="mt-2 text-base text-white/50">{project.name}</div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

function ProgressPanel({ project }: { project: ProjectBlockData }) {
  const [progress, ...codeMetrics] = project.metrics;
  const label = project.metricsLabel ?? "Growth & Performance";

  return (
    <div className="glass-card p-6 rounded-xl h-full border-l-4 border-l-[#508eff]">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-[#8e9192] mb-4">
        {label}
      </p>
      <div className="space-y-10">
        {progress && (
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-white font-bold">{progress.label}</span>
              <span className="text-[#508eff] font-mono">{progress.value}</span>
            </div>
            <div className="w-full bg-[#1f2020] h-1 rounded-full overflow-hidden">
              <div className="bg-[#508eff] h-full w-[95%]" />
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 gap-4">
          {codeMetrics.map((m) => (
            <div
              key={m.value}
              className="p-4 bg-[#121212] rounded border border-[#444748]/20"
            >
              <span className="font-mono text-[#aec6ff]">{m.value}</span>
              <p className="text-sm text-[#8e9192] mt-1">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OutcomePanel({ project }: { project: ProjectBlockData }) {
  const label = project.metricsLabel ?? "Outcome Metrics";

  return (
    <div className="glass-card p-6 rounded-xl bg-[#1b1c1c] overflow-hidden">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-[#8e9192] mb-4">
        {label}
      </p>
      <div className="space-y-4">
        {project.metrics.map((m) => (
          <div key={m.label} className="flex items-center gap-4">
            <span className="text-[64px] font-extrabold leading-none text-white">{m.value}</span>
            <span className="text-[#8e9192] text-sm leading-snug">{m.label}</span>
          </div>
        ))}
        {project.quote && (
          <div className="p-4 bg-[#aec6ff]/10 border border-[#aec6ff]/20 rounded">
            <p className="font-mono text-[#aec6ff] text-sm">
              &ldquo;{project.quote}&rdquo;
            </p>
          </div>
        )}
      </div>
      <div className="mt-6 grid grid-cols-4 gap-2">
        <div className="h-1 bg-[#aec6ff] rounded" />
        <div className="h-1 bg-[#aec6ff] rounded" />
        <div className="h-1 bg-[#aec6ff] rounded" />
        <div className="h-1 bg-[#444748] rounded" />
      </div>
    </div>
  );
}

function VizPanel({ project }: { project: ProjectBlockData }) {
  const label = project.metricsLabel ?? "Visualization Engine";

  return (
    <div className="glass-card rounded-xl p-6 h-full">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-[#8e9192] mb-4">
        {label}
      </p>
      <div className="aspect-video bg-black/40 rounded border border-[#444748]/30 relative overflow-hidden flex items-center justify-center group">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(#aec6ff 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <span className="material-symbols-outlined text-[#aec6ff] text-[60px] group-hover:scale-110 transition-transform z-10">
          hub
        </span>
        <div className="absolute bottom-3 left-3 right-3 bg-[#1f2020]/80 px-2 py-1 rounded text-xs font-mono text-[#8e9192] border border-[#444748]/20">
          AntV/X6 Orchestration Graph • 60fps
        </div>
      </div>
      <div className="mt-10 space-y-4">
        {project.metrics.map((m) => (
          <div
            key={m.label}
            className="flex justify-between border-b border-[#444748]/20 pb-2"
          >
            <span className="text-[#8e9192]">{m.label}</span>
            <span className="text-white font-mono">{m.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualPanel({ project }: { project: ProjectBlockData }) {
  switch (project.panelType) {
    case "progress":
      return <ProgressPanel project={project} />;
    case "outcome":
      return <OutcomePanel project={project} />;
    case "viz":
      return <VizPanel project={project} />;
    default:
      return <GridPanel project={project} />;
  }
}

export default function ProjectBlock({ project }: { project: ProjectBlockData }) {
  const isEven = project.order % 2 === 0;
  const badge = project.domainBadge ?? project.domainTags.join(" / ");

  const textColumn = (
    <div className={isEven ? "md:col-span-7 order-1 md:order-2" : "md:col-span-7"}>
      <div className="flex items-center gap-2 mb-2">
        {project.icon && (
          <span
            className="material-symbols-outlined text-[#aec6ff]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {project.icon}
          </span>
        )}
        <span className="font-mono text-xs bg-white/5 px-2 py-0.5 rounded text-[#aec6ff]">
          {badge}
        </span>
      </div>

      <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.02em] mb-4 text-white">
        {project.name}
      </h2>

      <div className="space-y-4 text-[18px] text-[#c4c7c7] leading-[1.6]">
        <p>{project.background}</p>
        {project.technicalDecisions.length > 0 && (
          <TechnicalDecisions decisions={project.technicalDecisions} />
        )}
      </div>

      {project.links.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.map((link) => (
            <a
              key={`${link.type}-${link.url}`}
              href={link.url}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#333333] px-4 py-2 text-sm font-medium text-white/80 transition-all hover:border-[#508eff] hover:text-white"
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel={link.url.startsWith("http") ? "noreferrer" : undefined}
            >
              {LINK_LABELS[link.type]}
            </a>
          ))}
        </div>
      )}
    </div>
  );

  const visualColumn = (
    <div className={isEven ? "md:col-span-5 order-2 md:order-1" : "md:col-span-5"}>
      <VisualPanel project={project} />
    </div>
  );

  return (
    <article className="mb-20 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
      {isEven ? (
        <>
          {visualColumn}
          {textColumn}
        </>
      ) : (
        <>
          {textColumn}
          {visualColumn}
        </>
      )}
    </article>
  );
}
