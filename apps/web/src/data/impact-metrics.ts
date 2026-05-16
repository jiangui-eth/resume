export interface ImpactMetric {
  value: string;
  title: string;
  description: string;
}

export const IMPACT_METRICS: readonly ImpactMetric[] = [
  {
    value: "14x",
    title: "SEO Traffic Growth",
    description: "Organic search uplift driven by Core Web Vitals and SSR optimisation",
  },
  {
    value: "80%",
    title: "Build Speed Increase",
    description: "CI pipeline cut from 25 min to under 4 min with ArgoCD and caching",
  },
  {
    value: "1.8s",
    title: "LCP Optimisation",
    description: "Page load reduced from 4.2s to 1.8s via code splitting and SSR",
  },
] as const;
