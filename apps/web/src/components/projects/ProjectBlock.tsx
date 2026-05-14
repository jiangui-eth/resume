"use client";

import { useState } from "react";
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

export interface ProjectBlockData {
  id: string;
  name: string;
  tagline: string;
  domainTags: string[];
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

function ProjectVisual({
  image,
  name,
}: {
  image?: ProjectImage;
  name: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (!image?.src || hasError) {
    return (
      <div className="flex h-full min-h-72 items-center justify-center rounded-[1.5rem] border border-white/8 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_45%),linear-gradient(180deg,_rgba(255,255,255,0.05),_rgba(255,255,255,0.02))] px-6 text-center">
        <div>
          <div className="text-sm font-medium uppercase tracking-[0.3em] text-white/30">
            Visual Pending
          </div>
          <div className="mt-3 text-lg text-white/55">{name}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-72 overflow-hidden rounded-[1.5rem] border border-white/8 bg-white/[0.03]">
      <Image
        src={image.src}
        alt={image.alt || name}
        fill
        sizes="(min-width: 1024px) 32rem, 100vw"
        className="object-cover"
        onError={() => setHasError(true)}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/55 via-transparent to-transparent" />
    </div>
  );
}

export default function ProjectBlock({ project }: { project: ProjectBlockData }) {
  return (
    <article className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,32rem)] lg:items-start">
        <div>
          <div className="flex flex-wrap gap-2">
            {project.domainTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {project.name}
          </h2>
          <p className="mt-3 text-lg text-white/45">{project.tagline}</p>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/60">{project.background}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {project.metrics.map((metric) => (
              <MetricBadge key={`${metric.label}-${metric.value}`} value={metric.value} label={metric.label} />
            ))}
          </div>

          <div className="mt-8">
            <TechnicalDecisions decisions={project.technicalDecisions} />
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.techTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/55"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={`${link.type}-${link.url}`}
                href={link.url}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={link.url.startsWith("http") ? "noreferrer" : undefined}
              >
                {LINK_LABELS[link.type]}
              </a>
            ))}
          </div>
        </div>

        <ProjectVisual image={project.images[0]} name={project.name} />
      </div>
    </article>
  );
}
