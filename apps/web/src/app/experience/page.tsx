import type { Metadata } from "next";

import MetricsBar from "@/components/experience/MetricsBar";
import Timeline from "@/components/experience/Timeline";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Experience | jiangui.eth",
    description:
      "8 年前端开发经历 — 关键岗位、量化成果与技术决策全景。",
    keywords: ["engineering experience", "full-stack", "web3", "timeline", "career"],
    openGraph: {
      title: "Experience | jiangui.eth",
      description:
        "8 年前端开发经历 — 关键岗位、量化成果与技术决策全景。",
      url: "/experience",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "jiangui.eth Experience" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Experience | jiangui.eth",
      description:
        "8 年前端开发经历 — 关键岗位、量化成果与技术决策全景。",
    },
  };
}

export default function ExperiencePage() {
  return (
    <div className="bg-[#121414] min-h-screen">
      <section
        aria-label="职业历程 header"
        className="pt-[120px] pb-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#aec6ff]/30 bg-[#aec6ff]/10 px-4 py-1.5 text-sm font-medium text-[#aec6ff]">
              职业历程
            </span>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              工作{" "}
              <span className="text-[#aec6ff]">经历</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-[#8e9192]">
              8 年前端开发经验，从传统企业系统到全球顶级加密货币交易所，再到 AI
              应用全栈研发。
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <Timeline />
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
