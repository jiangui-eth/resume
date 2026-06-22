export interface ImpactMetric {
  value: string;
  title: string;
  description: string;
}

export const IMPACT_METRICS: readonly ImpactMetric[] = [
  {
    value: "14x",
    title: "SEO 流量增长",
    description:
      "CSR → Next.js SSR 重构 + JSON-LD 结构化数据注入，自然搜索访问量实现 14 倍增长。",
  },
  {
    value: "80%",
    title: "构建速度提升",
    description:
      "Webpack → Vite 迁移，开发冷启动从 ~25s 降至 <5s，HMR 从 ~3s 降至 <0.5s。",
  },
  {
    value: "1.8s",
    title: "LCP 性能优化",
    description:
      "通过代码分割、图片懒加载与 SSR 优化，首屏 LCP 从约 4 秒降至 1.8 秒。",
  },
] as const;
