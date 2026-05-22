"use client";

import { useTranslations } from "next-intl";
import skillsData from "@/data/skills.json";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";

type ExpertiseCard = { id: string; title: string; icon: string };

const cards = skillsData.expertiseCards as ExpertiseCard[];

const DESCRIPTION_KEYS = ["ssrIsr", "microFrontends", "designSystem"] as const;

export default function ExpertiseCards() {
  const t = useTranslations();

  return (
    <SectionWrapper className="pb-20">
      <div className="bg-[#1b1c1c] border border-[#444748]/30 rounded-2xl p-10">
        <SectionHeader title={t("expertise.title")} className="mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {cards.map((card, i) => (
            <div key={card.id} className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#aec6ff]/10 border border-[#aec6ff]/30 flex items-center justify-center">
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
              <p className="text-base text-[#8e9192] leading-relaxed">
                {t(`expertiseDescriptions.${DESCRIPTION_KEYS[i]}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
