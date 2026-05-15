"use client";

import { track } from "@/lib/analytics";

export default function ProjectsCTA() {
  return (
    <section className="border-t border-[#333333]/30 bg-[#1b1c1c]">
      <div className="mx-auto max-w-300 px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Interested in the Technical Depth?
            </h2>
            <p className="mx-auto max-w-xl text-base text-[#8e9192]">
              Let&apos;s discuss the architecture decisions, tradeoffs, and
              engineering challenges behind these projects.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:jiangui.eth@gmail.com"
              onClick={() => track("click_get_in_touch", { source: "projects_cta" })}
              className="inline-flex items-center gap-2 rounded-lg bg-[#508eff] px-6 py-3 text-sm font-semibold text-[#00275e] transition-all hover:shadow-[0_0_30px_rgba(80,142,255,0.4)]"
            >
              Schedule Technical Interview
            </a>
            <a
              href="https://github.com/jiangui-eth"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("click_social_link", { platform: "github" })}
              className="inline-flex items-center gap-2 rounded-lg border border-[#333333] px-6 py-3 text-sm font-semibold text-white/80 transition-all hover:border-[#508eff] hover:text-white"
            >
              View GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
