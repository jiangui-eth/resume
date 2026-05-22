"use client";

import type { JSX } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Profile } from "@/types/profile";
import profileData from "@/data/profile.json";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";

const profile = profileData as Profile;

export default function AboutSection(): JSX.Element {
  const t = useTranslations();

  return (
    <SectionWrapper id="about" aria-label="About" className="py-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Bio card — 8 cols */}
        <div className="md:col-span-8 glass-card p-10 flex flex-col justify-center">
          <SectionHeader title={t("about.title")} />
          <p className="text-base leading-[1.6] text-[#c4c7c7] mb-4">
            {t("profile.summary")}
          </p>
          {/* Metrics row */}
          <div className="flex gap-10 mt-4">
            {profile.highlights.map(({ value, label }) => (
              <div key={label}>
                <p className="text-[32px] leading-[1.2] font-bold tracking-[-0.02em] text-[#508eff]">
                  {value}
                </p>
                <p className="font-mono text-sm font-medium leading-[1.4] tracking-[0.02em] text-[#8e9192]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Photo card — 4 cols */}
        <div className="md:col-span-4 glass-card overflow-hidden group min-h-70">
          <Image
            src={profile.avatarUrl}
            alt={`${profile.name} — ${profile.headline}`}
            width={400}
            height={480}
            priority
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            style={{ height: "100%", minHeight: "280px" }}
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
