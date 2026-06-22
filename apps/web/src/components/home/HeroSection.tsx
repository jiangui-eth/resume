import type { JSX } from "react";

import { getTranslations } from "next-intl/server";
import Link from "next/link";
import profileData from "@/data/profile.json";

export default async function HeroSection(): Promise<JSX.Element> {
  const t = await getTranslations();

  return (
    <section
      id="home"
      className="grid-bg relative flex min-h-[921px] flex-col items-center justify-center overflow-hidden px-6 py-20"
      aria-label="Hero"
    >
      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        className="via-ds-bg/50 to-ds-bg pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-transparent"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="border-ds-accent/30 bg-ds-accent/5 mb-4 inline-block rounded-full border px-2 py-1">
          <span className="text-ds-accent font-mono text-sm leading-[1.4] font-medium tracking-[0.15em] uppercase">
            {t("profile.headline")}
          </span>
        </div>

        {/* H1 */}
        <h1 className="text-ds-fg mb-4 text-[64px] leading-[1.1] font-extrabold tracking-[-0.04em]">
          {profileData.name} <span className="text-ds-accent-vivid">|</span>
          <br className="hidden md:block" /> {t("hero.tagline")}
        </h1>

        {/* Subtext */}
        <p className="text-ds-muted mx-auto mb-10 max-w-2xl text-lg leading-[1.6]">
          {t("profile.summary")}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={"/projects" as import("next").Route}
            className="bg-ds-accent-vivid text-ds-accent-dim rounded-lg px-10 py-4 text-2xl leading-[1.3] font-semibold tracking-[-0.01em] transition-all hover:shadow-[0_0_30px_rgba(80,142,255,0.4)]"
          >
            {t("hero.viewProjects")}
          </Link>
          <a
            href="#contact"
            className="border-ds-border-2 text-ds-fg hover:border-ds-accent rounded-lg border px-10 py-4 text-2xl leading-[1.3] font-semibold tracking-[-0.01em] transition-all"
          >
            {t("hero.getInTouch")}
          </a>
        </div>
      </div>

      {/* Glow orb */}
      <div
        aria-hidden="true"
        className="bg-ds-accent/10 pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full blur-[120px]"
      />
    </section>
  );
}
