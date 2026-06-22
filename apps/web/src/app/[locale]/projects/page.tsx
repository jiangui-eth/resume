import type { Metadata } from "next";
import type { ProjectBlockData } from "@/components/projects/ProjectBlock";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import ProjectBlock from "@/components/projects/ProjectBlock";

import ProjectsCTA from "@/components/projects/ProjectsCTA";
import SectionWrapper from "@/components/ui/SectionWrapper";
import projectsData from "@/data/projects.json";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("projectsPage");
  const description = t("description");
  return {
    title: "Projects | jiangui.eth",
    description,
    keywords: ["projects", "portfolio", "web3", "system design", "engineering"],
    openGraph: {
      title: "Projects | jiangui.eth",
      description,
      url: "/projects",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "jiangui.eth Projects",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Projects | jiangui.eth",
      description,
    },
  };
}

interface LocalizedProjectOverride {
  name?: string;
  tagline?: string;
  domainBadge?: string;
  metricsLabel?: string;
  quote?: string;
  background?: string;
  technicalDecisions?: { title: string; explanation: string }[];
  metrics?: { label: string }[];
}

export default async function ProjectsPage() {
  const t = await getTranslations("projectsPage");
  const locale = await getLocale();

  const messages = locale !== "en" ? await getMessages() : null;
  const projectsContent = messages?.projectsContent as
    | Record<string, LocalizedProjectOverride>
    | undefined;

  const PROJECTS = (projectsData as ProjectBlockData[])
    .sort((a, b) => a.order - b.order)
    .map((project) => {
      const override = projectsContent?.[project.id];
      if (!override) return project;
      return {
        ...project,
        name: override.name ?? project.name,
        tagline: override.tagline ?? project.tagline,
        domainBadge: override.domainBadge ?? project.domainBadge,
        metricsLabel: override.metricsLabel ?? project.metricsLabel,
        quote: override.quote ?? project.quote,
        background: override.background ?? project.background,
        technicalDecisions: override.technicalDecisions
          ? project.technicalDecisions.map((td, i) => ({
              ...td,
              ...(override.technicalDecisions?.[i] ?? {}),
            }))
          : project.technicalDecisions,
        metrics: override.metrics
          ? project.metrics.map((m, i) => ({
              ...m,
              label: override.metrics?.[i]?.label ?? m.label,
            }))
          : project.metrics,
      };
    });

  return (
    <div className="bg-ds-bg text-ds-fg min-h-screen">
      <SectionWrapper as="main" className="pt-20 pb-20">
        <header className="mb-20 max-w-3xl">
          <h1 className="mb-4 text-[64px] leading-[1.1] font-extrabold tracking-[-0.04em] text-white">
            {t("title")}{" "}
            <span className="from-ds-accent to-ds-accent-vivid bg-linear-to-br bg-clip-text text-transparent">
              {t("titleHighlight")}
            </span>
          </h1>
          <p className="text-ds-muted text-lg leading-relaxed">
            {t("description")}
          </p>
        </header>

        {PROJECTS.map((project) => (
          <ProjectBlock key={project.id} project={project} />
        ))}
      </SectionWrapper>

      <ProjectsCTA />
    </div>
  );
}
