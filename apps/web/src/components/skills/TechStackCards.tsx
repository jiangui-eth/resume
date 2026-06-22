"use client";

import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionWrapper from "@/components/ui/SectionWrapper";
import skillsData from "@/data/skills.json";

interface Tech {
  name: string;
  featured: boolean;
}
interface Category {
  category: string;
  icon: string;
  technologies: Tech[];
}

const defaultCategories = skillsData.techCategories as Category[];

interface TechStackCardsProps {
  categories?: Category[];
}

export default function TechStackCards({
  categories = defaultCategories,
}: TechStackCardsProps) {
  const t = useTranslations("techStack");

  return (
    <SectionWrapper className="pb-20">
      <SectionHeader title={t("title")} centered className="mb-10" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <div
            key={cat.category}
            className="glass-card flex flex-col gap-4 rounded-xl p-6"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-ds-accent">
                {cat.icon}
              </span>
              <h3 className="text-2xl font-semibold tracking-[-0.01em] text-white">
                {cat.category}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.technologies.map((tech) => (
                <span
                  key={tech.name}
                  className={
                    tech.featured
                      ? "border-ds-accent/50 bg-ds-surface-2 text-ds-accent rounded border px-2 py-0.5 font-mono text-xs"
                      : "border-ds-border-2/30 bg-ds-surface-2 text-ds-muted rounded border px-2 py-0.5 font-mono text-xs"
                  }
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
