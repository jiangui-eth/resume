import type { JSX } from "react";

import type { Capability, Profile } from "@/types/profile";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import SectionWrapper from "@/components/ui/SectionWrapper";
import profileData from "@/data/profile.json";

// ── CapabilityCard ─────────────────────────────────────────────────────────────

function CapabilityCard({ icon, title, bullets }: Capability): JSX.Element {
  return (
    <article className="group glass-card relative flex flex-col gap-6 overflow-hidden p-10">
      {/* Glow orb */}
      <div
        aria-hidden="true"
        className="bg-ds-accent/10 group-hover:bg-ds-accent/20 pointer-events-none absolute -top-12 -right-12 h-24 w-24 rounded-full blur-2xl transition-colors"
      />

      {/* Icon */}
      <div className="border-ds-accent/20 bg-ds-accent/10 group-hover:border-ds-accent/50 flex h-14 w-14 items-center justify-center rounded-xl border transition-all">
        <span
          className="material-symbols-outlined text-headline-medium"
          style={{
            fontVariationSettings: "'FILL' 1",
            color: "var(--ds-accent-vivid)",
          }}
          aria-hidden="true"
        >
          {icon}
        </span>
      </div>

      {/* Content */}
      <div>
        <h4 className="text-ds-fg mb-2 text-2xl leading-[1.3] font-semibold tracking-[-0.01em]">
          {title}
        </h4>
        <ul className="flex flex-col gap-2" role="list">
          {bullets.map((bullet) => (
            <li
              key={bullet}
              className="text-ds-muted flex items-center gap-2 font-mono text-sm leading-[1.4] font-medium tracking-[0.02em]"
            >
              <span
                className="bg-ds-accent-vivid h-1.5 w-1.5 shrink-0 rounded-full"
                aria-hidden="true"
              />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

// ── CapabilitySection ──────────────────────────────────────────────────────────

export default async function CapabilitySection(): Promise<JSX.Element> {
  const t = await getTranslations("capabilities");
  const locale = await getLocale();
  const messages = locale !== "en" ? await getMessages() : null;
  const capContent = messages?.capabilitiesContent as
    | Record<string, { title: string; bullets: string[] }>
    | undefined;

  const capabilities = (
    (profileData as Profile).capabilities as Capability[]
  ).map((cap) => ({
    ...cap,
    title: capContent?.[cap.icon]?.title ?? cap.title,
    bullets: capContent?.[cap.icon]?.bullets ?? cap.bullets,
  }));

  return (
    <section
      id="capabilities"
      className="bg-ds-bg relative overflow-hidden py-20"
      aria-label={t("title")}
    >
      {/* Grid background */}
      <div
        aria-hidden="true"
        className="grid-bg pointer-events-none absolute inset-0 opacity-30"
      />
      {/* Top fade */}
      <div
        aria-hidden="true"
        className="from-ds-bg pointer-events-none absolute top-0 left-0 h-32 w-full bg-linear-to-b to-transparent"
      />

      <SectionWrapper as="div" className="relative z-10">
        {/* Section header */}
        <div className="mb-10">
          <div className="border-ds-accent/20 bg-ds-accent/5 mb-4 inline-flex items-center gap-2 rounded-full border px-2 py-1">
            <span
              className="bg-ds-accent h-2 w-2 animate-pulse rounded-full"
              aria-hidden="true"
            />
            <span className="text-ds-accent font-mono text-sm leading-[1.4] font-medium tracking-[0.15em] uppercase">
              {t("badge")}
            </span>
          </div>
          <h3
            className="mb-1 text-display-large"
            style={{ color: "var(--ds-fg)" }}
          >
            {t("title")}
          </h3>
          <p className="text-ds-muted max-w-2xl text-lg leading-[1.6]">
            {t("description")}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap) => (
            <CapabilityCard key={cap.title} {...cap} />
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
}
