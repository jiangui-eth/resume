import type { Metadata } from "next";
import type { Experience } from "@/types/experience";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import MetricsBar from "@/components/experience/MetricsBar";

import Timeline from "@/components/experience/Timeline";
import experiencesData from "@/data/experiences.json";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("experience");
  const description = t("description");
  return {
    title: "Experience | jiangui.eth",
    description,
    keywords: [
      "engineering experience",
      "full-stack",
      "web3",
      "timeline",
      "career",
    ],
    openGraph: {
      title: "Experience | jiangui.eth",
      description,
      url: "/experience",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "jiangui.eth Experience",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Experience | jiangui.eth",
      description,
    },
  };
}

interface LocalizedExperienceOverride {
  company?: string;
  title?: string;
  location?: string;
  responsibilities?: string[];
  highlight?: string;
}

export default async function ExperiencePage() {
  const t = await getTranslations("experience");
  const locale = await getLocale();

  const messages = locale !== "en" ? await getMessages() : null;
  const experiencesContent = messages?.experiencesContent as
    | Record<string, LocalizedExperienceOverride>
    | undefined;

  const experiences = (experiencesData as Experience[]).map((exp) => {
    const override = experiencesContent?.[exp.id];
    if (!override) return exp;
    return { ...exp, ...override };
  });

  return (
    <div className="bg-ds-bg min-h-screen">
      <section
        aria-label={`${t("badge")} header`}
        className="px-4 pt-[120px] pb-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col gap-4">
            <span className="border-ds-accent/30 bg-ds-accent/10 text-ds-accent inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium">
              {t("badge")}
            </span>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              {t("title")}{" "}
              <span className="text-ds-accent">{t("titleHighlight")}</span>
            </h1>
            <p className="text-ds-muted mt-4 max-w-2xl text-lg">
              {t("description")}
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <Timeline experiences={experiences} />
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <MetricsBar />
        </div>
      </section>
    </div>
  );
}
