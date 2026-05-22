import type { JSX } from "react";

import type { Metadata } from "next";

import ExpertiseCards from "@/components/skills/ExpertiseCards";
import RadarChart from "@/components/skills/RadarChart";
import SkillsCTA from "@/components/skills/SkillsCTA";
import SkillsHero from "@/components/skills/SkillsHero";
import TechStackCards from "@/components/skills/TechStackCards";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Skills | jiangui.eth",
    description:
      "技术专长 — 全面的语言、框架、工具与工程实践总览。",
    keywords: ["skills", "tech stack", "typescript", "solidity", "react", "next.js", "go"],
    openGraph: {
      title: "Skills | jiangui.eth",
      description:
        "技术专长 — 全面的语言、框架、工具与工程实践总览。",
      url: "/skills",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "jiangui.eth Skills" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Skills | jiangui.eth",
      description:
        "技术专长 — 全面的语言、框架、工具与工程实践总览。",
    },
  };
}

export default function SkillsPage(): JSX.Element {
  return (
    <div className="bg-[#121414] min-h-screen grid-bg">
      <SkillsHero />
      <RadarChart />
      <TechStackCards />
      <ExpertiseCards />
      <SkillsCTA />
    </div>
  );
}
