import type { Metadata } from "next";
import RadarChart from "@/components/skills/RadarChart";
import TechStackCards from "@/components/skills/TechStackCards";
import ExpertiseCards from "@/components/skills/ExpertiseCards";
import SkillsCTA from "@/components/skills/SkillsCTA";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Skills | jiangui.eth",
    description:
      "Technical Proficiency. A breakdown of the languages, frameworks, tools, and practices powering my engineering work across Web2 and Web3.",
    keywords: ["skills", "tech stack", "typescript", "solidity", "react", "next.js", "go"],
    openGraph: {
      title: "Skills | jiangui.eth",
      description:
        "Technical Proficiency. A breakdown of the languages, frameworks, tools, and practices powering my engineering work across Web2 and Web3.",
      url: "/skills",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "jiangui.eth Skills" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Skills | jiangui.eth",
      description:
        "Technical Proficiency. A breakdown of the languages, frameworks, tools, and practices powering my engineering work across Web2 and Web3.",
    },
  };
}

export default function SkillsPage() {
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
            Tech Stack
          </span>
          <h1 className="text-5xl font-bold tracking-tight text-white/90 sm:text-6xl lg:text-7xl">
            Technical{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #93c5fd 0%, #c4b5fd 60%, #f9a8d4 100%)",
              }}
            >
              Proficiency.
            </span>
          </h1>
          <p className="max-w-2xl text-lg text-white/50">
            Languages, frameworks, and tools applied across production systems —
            from high-throughput backends to pixel-precise frontends.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
        <RadarChart />
      </div>
    </section>

    <TechStackCards />
    <ExpertiseCards />
    <SkillsCTA />
  </>
  );
}
