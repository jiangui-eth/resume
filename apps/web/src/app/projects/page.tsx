import type { Metadata } from "next";

import ProjectBlock, {
  type ProjectBlockData,
} from "@/components/projects/ProjectBlock";
import projectsData from "@/data/projects.json";
import ProjectsCTA from "@/components/projects/ProjectsCTA";
import SectionWrapper from "@/components/ui/SectionWrapper";

const PROJECTS = (projectsData as ProjectBlockData[]).sort(
  (a, b) => a.order - b.order
);

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Projects | jiangui.eth",
    description:
      "架构与实现 — 精选项目工程实践，涵盖系统设计决策与交付细节。",
    keywords: ["projects", "portfolio", "web3", "system design", "engineering"],
    openGraph: {
      title: "Projects | jiangui.eth",
      description:
        "架构与实现 — 精选项目工程实践，涵盖系统设计决策与交付细节。",
      url: "/projects",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "jiangui.eth Projects" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Projects | jiangui.eth",
      description:
        "架构与实现 — 精选项目工程实践，涵盖系统设计决策与交付细节。",
    },
  };
}

export default function ProjectsPage() {
  return (
    <div className="bg-[#121414] min-h-screen text-[#e3e2e2]">
      <SectionWrapper as="main" className="pt-20 pb-20">
        <header className="mb-20 max-w-3xl">
          <h1 className="text-[64px] font-extrabold leading-[1.1] tracking-[-0.04em] text-white mb-4">
            架构{" "}
            <span className="bg-linear-to-br from-[#aec6ff] to-[#508eff] bg-clip-text text-transparent">
              与实现。
            </span>
          </h1>
          <p className="text-lg text-[#8e9192] leading-relaxed">
            技术领导力与前端工程实践的精选展示，涵盖复杂迁移、高性能系统与 AI
            集成架构。
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
