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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {METRICS.map((metric) => (
        <article
          key={metric.title}
          className="glass-card p-6 rounded-xl border-l-4 border-l-[#508eff]"
        >
          <p className="text-4xl font-bold text-[#508eff]">{metric.value}</p>
          <p className="mt-2 text-xs font-medium uppercase tracking-widest text-[#8e9192]">
            {metric.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            {metric.description}
          </p>
        </article>
      ))}
    </div>
  );
}
