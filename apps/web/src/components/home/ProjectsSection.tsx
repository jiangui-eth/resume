"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { useTranslations } from "next-intl";
import { cn } from "@jiangui-resume/ui/lib/utils";
import type { Project } from "@/types/project";
import projectsData from "@/data/projects.json";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";

const PROJECTS_HREF = "/projects" as Route;

const PROJECTS: Project[] = (projectsData as Project[])
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order)
  .slice(0, 2);

// ── ProjectImage ───────────────────────────────────────────────────────────────

interface ProjectImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

function ProjectImage({ src, alt, priority }: ProjectImageProps): React.JSX.Element {
  const [error, setError] = React.useState(false);

  if (error || !src) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#1f2020]">
        <span className="text-xs text-[#8e9192]">Image unavailable</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover opacity-80 hover:opacity-100 transition-opacity"
      priority={priority}
      onError={() => setError(true)}
    />
  );
}

// ── ProjectRow ─────────────────────────────────────────────────────────────────

interface ProjectRowProps {
  project: Project;
  imageRight?: boolean;
  priority?: boolean;
}

function ProjectRow({ project, imageRight, priority }: ProjectRowProps): React.JSX.Element {
  const t = useTranslations("projects");

  return (
    <article className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
      {/* Image — 7 cols */}
      <div
        className={cn(
          "md:col-span-7 rounded-lg overflow-hidden border border-[#444748]/30 bg-[#1f2020] shadow-2xl relative aspect-video",
          imageRight && "md:order-2",
        )}
      >
        <ProjectImage
          src={project.images[0]?.src ?? ""}
          alt={project.images[0]?.alt ?? project.name}
          priority={priority}
        />
      </div>

      {/* Text — 5 cols */}
      <div className={cn("md:col-span-5", imageRight && "md:order-1")}>
        <span className="font-mono text-sm font-medium leading-[1.4] tracking-[0.02em] text-[#aec6ff] mb-2 block">
          {project.domainTags[0]}
        </span>
        <h4 className="text-[32px] leading-[1.2] font-bold tracking-[-0.02em] text-[#e3e2e2] mb-4">
          {project.name}
        </h4>
        <p className="text-base leading-[1.6] text-[#8e9192] mb-6">
          {project.tagline}
        </p>
        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-[#343535] rounded font-mono text-sm font-normal leading-normal text-[#e3e2e2]"
            >
              {tag}
            </span>
          ))}
        </div>
        {/* Case study link */}
        <Link
          href={PROJECTS_HREF}
          className="flex items-center gap-2 text-2xl font-semibold leading-[1.3] tracking-[-0.01em] text-[#e3e2e2] group hover:text-[#aec6ff] transition-colors"
        >
          {t("caseDetails")}{" "}
          <span
            className="material-symbols-outlined group-hover:translate-x-1 transition-transform"
            aria-hidden="true"
          >
            arrow_outward
          </span>
        </Link>
      </div>
    </article>
  );
}

// ── ProjectsSection ────────────────────────────────────────────────────────────

export default function ProjectsSection(): React.JSX.Element {
  const t = useTranslations("projects");

  return (
    <SectionWrapper id="projects" aria-label={t("title")} className="py-20">
      {/* Section header */}
      <div className="mb-10 flex justify-between items-end">
        <SectionHeader level={3} title={t("title")} subtitle={t("subtitle")} />
        <Link
          href={PROJECTS_HREF}
          className="font-mono text-sm font-medium leading-[1.4] tracking-[0.02em] text-[#aec6ff] hover:underline flex items-center gap-1 shrink-0"
        >
          {t("viewAll")}{" "}
          <span className="material-symbols-outlined text-base" aria-hidden="true">
            arrow_forward
          </span>
        </Link>
      </div>

      {/* Alternating project rows */}
      <div className="flex flex-col gap-10">
        {PROJECTS.map((project, i) => (
          <ProjectRow
            key={project.id}
            project={project}
            imageRight={i % 2 !== 0}
            priority={i === 0}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
