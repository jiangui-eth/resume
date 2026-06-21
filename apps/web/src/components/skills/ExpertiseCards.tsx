"use client";

import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionWrapper from "@/components/ui/SectionWrapper";
import skillsData from "@/data/skills.json";

interface ExpertiseCard {
  id: string;
  title: string;
  icon: string;
}

const cards = skillsData.expertiseCards as ExpertiseCard[];

const DESCRIPTION_KEYS = ["ssrIsr", "microFrontends", "designSystem"] as const;

export default function ExpertiseCards() {
  const t = useTranslations();

  return (
    <SectionWrapper className="pb-20">
      <div className="rounded-2xl border border-[#444748]/30 bg-[#1b1c1c] p-10">
        <SectionHeader title={t("expertise.title")} className="mb-10" />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {cards.map((card, i) => (
            <div key={card.id} className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#aec6ff]/30 bg-[#aec6ff]/10">
                <span
                  className="material-symbols-outlined text-[#aec6ff]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {card.icon}
                </span>
              </div>
              <h4 className="text-2xl font-semibold tracking-[-0.01em] text-white">
                {card.title}
              </h4>
              <p className="text-base leading-relaxed text-[#8e9192]">
                {t(`expertiseDescriptions.${DESCRIPTION_KEYS[i]}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
