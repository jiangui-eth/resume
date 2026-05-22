"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function SkillsHero(): JSX.Element {
  const t = useTranslations("skillsHero");

  return (
    <SectionWrapper className="pt-10 pb-20 relative overflow-hidden">
      <div className="relative z-10 max-w-3xl pt-20">
        <span className="font-mono text-sm text-[#aec6ff] tracking-widest uppercase mb-2 block">
          {t("badge")}
        </span>
        <h1 className="text-[64px] font-extrabold leading-[1.1] tracking-[-0.04em] text-white mb-4">
          {t("title")}
        </h1>
        <p className="text-lg text-[#8e9192] mb-6 leading-relaxed max-w-2xl">
          {t("description")}
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="px-4 py-2 border border-[#444748]/50 rounded-lg flex items-center gap-2 bg-[#1b1c1c]">
            <span
              className="material-symbols-outlined text-[#aec6ff]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              terminal
            </span>
            <span className="font-mono text-sm">{t("systemArchitecture")}</span>
          </div>
          <div className="px-4 py-2 border border-[#444748]/50 rounded-lg flex items-center gap-2 bg-[#1b1c1c]">
            <span
              className="material-symbols-outlined text-[#aec6ff]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              speed
            </span>
            <span className="font-mono text-sm">{t("performanceFirst")}</span>
          </div>
        </div>
      </div>

      {/* Decorative hexagon — right side, desktop only */}
      <div className="absolute right-0 top-0 w-1/3 h-full opacity-20 pointer-events-none hidden lg:block" aria-hidden="true">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-[#aec6ff] stroke-current fill-none"
        >
          <path d="M 50,5 L 95,30 L 95,70 L 50,95 L 5,70 L 5,30 Z" strokeWidth="0.5" />
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
