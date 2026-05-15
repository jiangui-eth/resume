import type { Metadata } from "next";

import MetricsBar from "@/components/experience/MetricsBar";
import Timeline from "@/components/experience/Timeline";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Experience | jiangui.eth",
    description:
      "Five years of full-stack and Web3 engineering — key roles, impact metrics, and the technical decisions behind them.",
    keywords: ["engineering experience", "full-stack", "web3", "timeline", "career"],
    openGraph: {
      title: "Experience | jiangui.eth",
      description:
        "Five years of full-stack and Web3 engineering — key roles, impact metrics, and the technical decisions behind them.",
      url: "/experience",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "jiangui.eth Experience" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Experience | jiangui.eth",
      description:
        "Five years of full-stack and Web3 engineering — key roles, impact metrics, and the technical decisions behind them.",
    },
  };
}

export default function ExperiencePage() {
  return (
    <div className="bg-[#121414] min-h-screen">
      <section
        aria-label="Career Chronicle header"
        className="pt-[120px] pb-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#aec6ff]/30 bg-[#aec6ff]/10 px-4 py-1.5 text-sm font-medium text-[#aec6ff]">
              Career Chronicle
            </span>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Career{" "}
              <span className="text-[#aec6ff]">Chronicle</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-[#8e9192]">
              Five years shipping production systems across Web2 and Web3 —
              from real-time IoT platforms to high-performance SEO tools and
              on-chain products.
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
