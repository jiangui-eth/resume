import type { Route } from "next";

import type { JSX } from "react";
import type { Project } from "@/types/project";
import { cn } from "@jiangui-resume/ui/lib/utils";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionWrapper from "@/components/ui/SectionWrapper";
import projectsData from "@/data/projects.json";
import ProjectImageClient from "./ProjectImageClient";

const PROJECTS_HREF = "/projects" as Route;

// ── ProjectRow ─────────────────────────────────────────────────────────────────

interface ProjectRowProps {
  project: Project;
  imageRight?: boolean;
  priority?: boolean;
  caseDetailsLabel: string;
}

function ProjectRow({
  project,
  imageRight,
  priority,
  caseDetailsLabel,
}: ProjectRowProps): JSX.Element {
  return (
    <article className="grid grid-cols-1 items-center gap-6 md:grid-cols-12">
      {/* Image — 7 cols */}
      <div
        className={cn(
          "border-ds-border-2/30 bg-ds-surface-2 relative aspect-video overflow-hidden rounded-lg border shadow-2xl md:col-span-7",
          imageRight && "md:order-2",
        )}
      >
        <ProjectImageClient
          src={project.images[0]?.src ?? ""}
          alt={project.images[0]?.alt ?? project.name}
          priority={priority}
        />
      </div>

      {/* Text — 5 cols */}
      <div className={cn("md:col-span-5", imageRight && "md:order-1")}>
        <span className="text-ds-accent mb-2 block font-mono text-sm leading-[1.4] font-medium tracking-[0.02em]">
          {project.domainTags[0]}
        </span>
        <h4 className="text-ds-fg mb-4 text-[32px] leading-[1.2] font-bold tracking-[-0.02em]">
          {project.name}
        </h4>
        <p className="text-ds-muted mb-6 text-base leading-[1.6]">
          {project.tagline}
        </p>
        {/* Tech tags */}
        <div className="mb-6 flex flex-wrap gap-2">
          {project.techTags.map((tag) => (
            <span
              key={tag}
              className="bg-ds-tag text-ds-fg rounded px-2 py-1 font-mono text-sm leading-normal font-normal"
            >
              {tag}
            </span>
          ))}
        </div>
        {/* Case study link */}
        <Link
          href={PROJECTS_HREF}
          className="group text-ds-fg hover:text-ds-accent flex items-center gap-2 text-2xl leading-[1.3] font-semibold tracking-[-0.01em] transition-colors"
        >
          {caseDetailsLabel}{" "}
          <span
            className="material-symbols-outlined transition-transform group-hover:translate-x-1"
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

export default async function ProjectsSection(): Promise<JSX.Element> {
  const t = await getTranslations("projects");
  const locale = await getLocale();
  const messages = locale !== "en" ? await getMessages() : null;
  const projContent = messages?.projectsContent as
    | Record<string, { name?: string; tagline?: string; domainBadge?: string }>
    | undefined;

  const PROJECTS: Project[] = (projectsData as Project[])
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, 2)
    .map((p) => {
      const override = projContent?.[p.id];
      if (!override) return p;
      return {
        ...p,
        name: override.name ?? p.name,
        tagline: override.tagline ?? p.tagline,
        domainTags: override.domainBadge
          ? [override.domainBadge, ...p.domainTags.slice(1)]
          : p.domainTags,
      };
    });

  return (
    <SectionWrapper id="projects" aria-label={t("title")} className="py-20">
      {/* Section header */}
      <div className="mb-10 flex items-end justify-between">
        <SectionHeader level={3} title={t("title")} subtitle={t("subtitle")} />
        <Link
          href={PROJECTS_HREF}
          className="text-ds-accent flex shrink-0 items-center gap-1 font-mono text-sm leading-[1.4] font-medium tracking-[0.02em] hover:underline"
        >
          {t("viewAll")}{" "}
          <span
            className="material-symbols-outlined text-base"
            aria-hidden="true"
          >
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
            caseDetailsLabel={t("caseDetails")}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
