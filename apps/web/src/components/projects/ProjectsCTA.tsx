"use client";

import { useTranslations } from "next-intl";
import { track } from "@/lib/analytics";

export default function ProjectsCTA() {
  const t = useTranslations("projectsCTA");

  return (
    <section className="border-ds-border-2/30 border-t py-20 text-center">
      <div className="mx-auto max-w-300 px-6">
        <h2 className="mb-4 text-[32px] leading-[1.2] font-bold tracking-[-0.02em] text-white">
          {t("title")}
        </h2>
        <p className="text-ds-muted mx-auto mb-10 max-w-2xl text-lg leading-relaxed">
          {t("description")}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:jiangui.eth@gmail.com"
            onClick={() =>
              track("click_get_in_touch", { source: "projects_cta" })
            }
            className="inline-flex items-center gap-2 rounded-lg bg-white px-10 py-4 text-sm font-bold text-black transition-all hover:bg-gray-100"
          >
            {t("scheduleChat")}
          </a>
          <a
            href="https://github.com/jiangui-eth"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("click_social_link", { platform: "github" })}
            className="border-ds-border-2 hover:border-ds-accent inline-flex items-center gap-2 rounded-lg border px-10 py-4 text-sm font-bold text-white transition-all"
          >
            {t("viewGithub")}
          </a>
        </div>
      </div>
    </section>
  );
}
