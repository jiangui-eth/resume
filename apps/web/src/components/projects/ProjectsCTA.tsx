"use client";

import { track } from "@/lib/analytics";

export default function ProjectsCTA() {
  return (
    <section className="py-20 border-t border-[#444748]/30 text-center">
      <div className="mx-auto max-w-300 px-6">
        <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.02em] text-white mb-4">
          深入了解技术细节？
        </h2>
        <p className="text-[#8e9192] text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          这些项目的完整技术文档与系统设计图可按需提供，欢迎深度技术交流。
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:jiangui.eth@gmail.com"
            onClick={() => track("click_get_in_touch", { source: "projects_cta" })}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-10 py-4 text-sm font-bold text-black transition-all hover:bg-gray-100"
          >
            预约技术交流
          </a>
          <a
            href="https://github.com/jiangui-eth"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("click_social_link", { platform: "github" })}
            className="inline-flex items-center gap-2 rounded-lg border border-[#444748] px-10 py-4 text-sm font-bold text-white transition-all hover:border-[#aec6ff]"
          >
            查看 GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
