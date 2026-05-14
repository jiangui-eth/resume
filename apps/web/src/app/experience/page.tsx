import type { Metadata } from "next";

import Timeline from "@/components/experience/Timeline";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Experience | jiangui.eth",
    description:
      "Five years of full-stack and Web3 engineering — key roles, impact metrics, and the technical decisions behind them.",
  };
}

export default function ExperiencePage() {
  return (
    <>
      <section
        className="flex min-h-[40vh] items-center"
        style={{ background: "#0a0a0f" }}
      >
        <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300">
              Career Chronicle
            </span>
            <h1 className="text-5xl font-bold tracking-tight text-white/90 sm:text-6xl lg:text-7xl">
              Career
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #93c5fd 0%, #c4b5fd 60%, #f9a8d4 100%)",
                }}
              >
                Chronicle
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/50">
              Five years shipping production systems across Web2 and Web3 —
              from real-time IoT platforms to high-performance SEO tools and
              on-chain products.
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">
        <Timeline />
      </section>
    </>
  );
}
