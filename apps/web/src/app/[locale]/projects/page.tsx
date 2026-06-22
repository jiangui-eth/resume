import type { Metadata } from "next";
import type { ProjectBlockData } from "@/components/projects/ProjectBlock";
import { getTranslations } from "next-intl/server";
import ProjectBlock from "@/components/projects/ProjectBlock";

import ProjectsCTA from "@/components/projects/ProjectsCTA";
import SectionWrapper from "@/components/ui/SectionWrapper";
import projectsData from "@/data/projects.json";
import { routing } from "@/i18n/routing";

const PROJECTS = (projectsData as ProjectBlockData[]).sort(
  (a, b) => a.order - b.order,
);

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

export default async function ProjectsPage() {
  const t = await getTranslations("projectsPage");

  return (
    <div className="min-h-screen bg-[#121414] text-[#e3e2e2]">
      <SectionWrapper as="main" className="pt-20 pb-20">
        <header className="mb-20 max-w-3xl">
          <h1 className="mb-4 text-[64px] leading-[1.1] font-extrabold tracking-[-0.04em] text-white">
            {t("title")}{" "}
            <span className="bg-linear-to-br from-[#aec6ff] to-[#508eff] bg-clip-text text-transparent">
              {t("titleHighlight")}
            </span>
          </h1>
          <p className="text-lg leading-relaxed text-[#8e9192]">
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
