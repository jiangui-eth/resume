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
  };
}

export default function ProjectsPage() {
  return (
    <>
      <section
        className="relative overflow-hidden"
        style={{ background: "#0a0a0f" }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(147,197,253,0.15), rgba(196,181,253,0.15), transparent)",
          }}
        />

        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300">
              Selected Works
            </span>
            <h1 className="text-5xl font-bold tracking-tight text-white/90 sm:text-6xl lg:text-7xl">
              Architecture &{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #93c5fd 0%, #c4b5fd 60%, #f9a8d4 100%)",
                }}
              >
                Implementation.
              </span>
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-white/50">
              A focused collection of production work spanning product strategy,
              frontend systems, and full-stack delivery across Web2 and Web3.
            </p>
          </div>

          <div className="mt-14 grid gap-8">
            {PROJECTS.map((project) => (
              <ProjectBlock key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
      <ProjectsCTA />
    </>
  );
}
