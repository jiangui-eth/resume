export default function ProjectsCTA() {
  return (
    <section
      className="border-t border-white/10"
      style={{ background: "#0a0a0f" }}
    >
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-bold tracking-tight text-white/90 sm:text-4xl">
              Interested in the Technical Depth?
            </h2>
            <p className="mx-auto max-w-xl text-base text-white/50">
              Let&apos;s discuss the architecture decisions, tradeoffs, and
              engineering challenges behind these projects.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:jiangui.eth@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              Schedule Technical Interview
            </a>
            <a
              href="https://github.com/jiangui-eth"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
            >
              View GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
