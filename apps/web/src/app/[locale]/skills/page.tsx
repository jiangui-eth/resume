import type { Metadata } from "next";

import type { JSX } from "react";
import { getLocale, getMessages } from "next-intl/server";
import ExpertiseCards from "@/components/skills/ExpertiseCards";

import RadarChart from "@/components/skills/RadarChart";
import SkillsCTA from "@/components/skills/SkillsCTA";
import SkillsHero from "@/components/skills/SkillsHero";
import TechStackCards from "@/components/skills/TechStackCards";
import skillsData from "@/data/skills.json";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Skills | jiangui.eth",
    description: "技术专长 — 全面的语言、框架、工具与工程实践总览。",
    keywords: [
      "skills",
      "tech stack",
      "typescript",
      "solidity",
      "react",
      "next.js",
      "go",
    ],
    openGraph: {
      title: "Skills | jiangui.eth",
      description: "技术专长 — 全面的语言、框架、工具与工程实践总览。",
      url: "/skills",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "jiangui.eth Skills",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Skills | jiangui.eth",
      description: "技术专长 — 全面的语言、框架、工具与工程实践总览。",
    },
  };
}

export default async function SkillsPage(): Promise<JSX.Element> {
  const locale = await getLocale();
  const messages = locale !== "en" ? await getMessages() : null;
  const categoryNames = messages?.techCategoryNames as
    | Record<string, string>
    | undefined;
  const cardTitles = messages?.expertiseCardTitles as
    | Record<string, string>
    | undefined;

  const categories = skillsData.techCategories.map((cat) => ({
    ...cat,
    category: categoryNames?.[cat.category] ?? cat.category,
  }));

  const cards = skillsData.expertiseCards.map((card) => ({
    ...card,
    title: cardTitles?.[card.id] ?? card.title,
  }));

  return (
    <div className="grid-bg bg-ds-bg min-h-screen">
      <SkillsHero />
      <RadarChart />
      <TechStackCards categories={categories} />
      <ExpertiseCards cards={cards} />
      <SkillsCTA />
    </div>
  );
}
