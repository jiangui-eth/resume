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

const defaultCards = skillsData.expertiseCards as ExpertiseCard[];

const DESCRIPTION_KEYS = ["ssrIsr", "microFrontends", "designSystem"] as const;

interface ExpertiseCardsProps {
  cards?: ExpertiseCard[];
}

export default function ExpertiseCards({
  cards = defaultCards,
}: ExpertiseCardsProps) {
  const t = useTranslations();

  return (
    <SectionWrapper className="pb-20">
      <div className="border-ds-border-2/30 bg-ds-surface rounded-2xl border p-10">
        <SectionHeader title={t("expertise.title")} className="mb-10" />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {cards.map((card, i) => (
            <div key={card.id} className="space-y-4">
              <div className="border-ds-accent/30 bg-ds-accent/10 flex h-12 w-12 items-center justify-center rounded-lg border">
                <span
                  className="material-symbols-outlined text-ds-accent"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {card.icon}
                </span>
              </div>
              <h4 className="text-2xl font-semibold tracking-[-0.01em] text-white">
                {card.title}
              </h4>
              <p className="text-ds-muted text-base leading-relaxed">
                {t(`expertiseDescriptions.${DESCRIPTION_KEYS[i]}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
