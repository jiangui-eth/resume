"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function SkillsHero(): JSX.Element {
  const t = useTranslations("skillsHero");

  return (
    <SectionWrapper className="relative overflow-hidden pt-10 pb-20">
      <div className="relative z-10 max-w-3xl pt-20">
        <span className="text-ds-accent mb-2 block font-mono text-sm tracking-widest uppercase">
          {t("badge")}
        </span>
        <h1 className="mb-4 text-[64px] leading-[1.1] font-extrabold tracking-[-0.04em] text-white">
          {t("title")}
        </h1>
        <p className="text-ds-muted mb-6 max-w-2xl text-lg leading-relaxed">
          {t("description")}
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="border-ds-border-2/50 bg-ds-surface flex items-center gap-2 rounded-lg border px-4 py-2">
            <span
              className="material-symbols-outlined text-ds-accent"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              terminal
            </span>
            <span className="font-mono text-sm">{t("systemArchitecture")}</span>
          </div>
          <div className="border-ds-border-2/50 bg-ds-surface flex items-center gap-2 rounded-lg border px-4 py-2">
            <span
              className="material-symbols-outlined text-ds-accent"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              speed
            </span>
            <span className="font-mono text-sm">{t("performanceFirst")}</span>
          </div>
        </div>
      </div>

      {/* Decorative hexagon — right side, desktop only */}
      <div
        className="pointer-events-none absolute top-0 right-0 hidden h-full w-1/3 opacity-20 lg:block"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 100 100"
          className="text-ds-accent h-full w-full fill-none stroke-current"
        >
          <path
            d="M 50,5 L 95,30 L 95,70 L 50,95 L 5,70 L 5,30 Z"
            strokeWidth="0.5"
          />
          <circle cx="50" cy="50" fill="currentColor" r="2" />
          <path
            d="M 50,5 L 50,50 M 95,30 L 50,50 M 95,70 L 50,50 M 50,95 L 50,50 M 5,70 L 50,50 M 5,30 L 50,50"
            strokeWidth="0.2"
          />
        </svg>
      </div>
    </SectionWrapper>
  );
}
