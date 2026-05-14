const METRICS = [
  {
    value: "14x",
    title: "SEO Traffic Growth",
    description:
      "Organic search uplift driven by Core Web Vitals and SSR optimisation",
  },
  {
    value: "80%",
    title: "Build Speed Increase",
    description:
      "CI pipeline cut from 25 min to under 4 min with ArgoCD and caching",
  },
  {
    value: "1.8s",
    title: "LCP Optimisation",
    description:
      "Page load reduced from 4.2s to 1.8s via code splitting and SSR",
  },
] as const;

export default function MetricsBar() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] md:flex-row">
        {METRICS.map((metric, index) => {
          const isLast = index === METRICS.length - 1;

          return (
            <div key={metric.title} className="flex flex-1 flex-col md:flex-row">
              <article className="flex-1 px-6 py-7 sm:px-8">
                <p
                  className="text-4xl font-semibold tracking-tight text-transparent sm:text-5xl"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #93c5fd 0%, #c4b5fd 60%, #f9a8d4 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  {metric.value}
                </p>
                <h2 className="mt-3 text-base font-medium text-white/70">
                  {metric.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/40">
                  {metric.description}
                </p>
              </article>
              {!isLast ? (
                <>
                  <div className="h-px bg-white/8 md:hidden" aria-hidden="true" />
                  <div className="hidden w-px self-stretch bg-white/8 md:block" aria-hidden="true" />
                </>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
