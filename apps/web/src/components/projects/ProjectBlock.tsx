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

function ProjectVisual({ image, name }: { image?: ProjectImage; name: string }) {
  const [hasError, setHasError] = useState(false);

  if (!image?.src || hasError) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-[#333333]/30 bg-[#1b1c1c] text-center">
        <div>
          <div className="text-sm font-medium uppercase tracking-[0.3em] text-white/30">
            Visual Pending
          </div>
          <div className="mt-2 text-base text-white/50">{name}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-[#333333]/30 bg-[#1b1c1c]">
      <Image
        src={image.src}
        alt={image.alt || name}
        fill
        sizes="(min-width: 1024px) 58vw, 100vw"
        className="object-cover opacity-80 transition-opacity hover:opacity-100"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

export default function ProjectBlock({ project }: { project: ProjectBlockData }) {
  return (
    <article className="py-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start">

        {/* Left — screenshot + metrics (7 cols) */}
        <div className="md:col-span-7">
          <ProjectVisual image={project.images[0]} name={project.name} />

          {project.metrics.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-8">
              {project.metrics.map((metric) => (
                <MetricBadge
                  key={`${metric.label}-${metric.value}`}
                  value={metric.value}
                  label={metric.label}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right — details (5 cols) */}
        <div className="md:col-span-5">
          {/* Category / domain tags */}
          <div className="mb-4 flex flex-wrap gap-3">
            {project.domainTags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium uppercase tracking-widest text-[#aec6ff]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white md:text-3xl">{project.name}</h2>

          {/* Tagline */}
          <p className="mt-2 text-[#8e9192]">{project.tagline}</p>

          {/* Background description */}
          <p className="mt-4 text-sm leading-7 text-white/60">{project.background}</p>

          {/* Technical decisions */}
          {project.technicalDecisions.length > 0 && (
            <div className="mt-6">
              <TechnicalDecisions decisions={project.technicalDecisions} />
            </div>
          )}

          {/* Tech tags */}
          {project.techTags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.techTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-[#1b1c1c] px-2 py-0.5 font-mono text-xs text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Links */}
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
      </div>
    </article>
  );
}
