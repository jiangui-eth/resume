import type { JSX } from "react";

import type { Profile } from "@/types/profile";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionWrapper from "@/components/ui/SectionWrapper";
import profileData from "@/data/profile.json";

const profile = profileData as Profile;

export default async function AboutSection(): Promise<JSX.Element> {
  const t = await getTranslations();
  const locale = await getLocale();
  const messages = locale !== "en" ? await getMessages() : null;
  const highlightLabels = messages?.profileHighlights as
    | Record<string, string>
    | undefined;

  return (
    <SectionWrapper id="about" aria-label="About" className="py-20">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Bio card — 8 cols */}
        <div className="glass-card flex flex-col justify-center p-10 md:col-span-8">
          <SectionHeader title={t("about.title")} />
          <p className="mb-4 text-base leading-[1.6] text-[#c4c7c7]">
            {t("profile.summary")}
          </p>
          {/* Metrics row */}
          <div className="mt-4 flex gap-10">
            {profile.highlights.map(({ value, label }) => (
              <div key={label}>
                <p className="text-[32px] leading-[1.2] font-bold tracking-[-0.02em] text-[#508eff]">
                  {value}
                </p>
                <p className="font-mono text-sm leading-[1.4] font-medium tracking-[0.02em] text-[#8e9192]">
                  {highlightLabels?.[label] ?? label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Photo card — 4 cols */}
        <div className="glass-card group min-h-70 overflow-hidden md:col-span-4">
          <Image
            src={profile.avatarUrl}
            alt={`${profile.name} — ${profile.headline}`}
            width={400}
            height={480}
            priority
            className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
            style={{ height: "100%", minHeight: "280px" }}
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
