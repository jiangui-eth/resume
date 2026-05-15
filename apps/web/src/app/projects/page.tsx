import type { Metadata } from "next";

import ProjectBlock, {
  type ProjectBlockData,
} from "@/components/projects/ProjectBlock";
import projectsData from "@/data/projects.json";
import ProjectsCTA from "@/components/projects/ProjectsCTA";

const PROJECTS = (projectsData as ProjectBlockData[]).sort(
  (a, b) => a.order - b.order
);

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Projects | jiangui.eth",
    description:
      "Architecture & Implementation. A curated view of product engineering work, system design decisions, and execution detail across shipped projects.",
    keywords: ["projects", "portfolio", "web3", "system design", "engineering"],
    openGraph: {
      title: "Projects | jiangui.eth",
      description:
        "Architecture & Implementation. A curated view of product engineering work, system design decisions, and execution detail across shipped projects.",
      url: "/projects",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "jiangui.eth Projects" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Projects | jiangui.eth",
      description:
        "Architecture & Implementation. A curated view of product engineering work, system design decisions, and execution detail across shipped projects.",
    },
  };
}

export default function ProjectsPage() {
  return (
    <div className="bg-[#121414] min-h-screen">
      <section className="pt-30 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-300">
          <div className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#aec6ff]/30 bg-[#aec6ff]/10 px-4 py-1.5 text-sm font-medium text-[#aec6ff]">
              Selected Works
            </span>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Architecture &{" "}
              <span className="text-[#aec6ff]">Implementation.</span>
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-[#8e9192]">
              A focused collection of production work spanning product strategy,
              frontend systems, and full-stack delivery across Web2 and Web3.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-300 divide-y divide-[#333333]/30">
          {PROJECTS.map((project) => (
            <ProjectBlock key={project.id} project={project} />
          ))}
        </div>
      </section>

      <ProjectsCTA />
    </div>
  );
}
