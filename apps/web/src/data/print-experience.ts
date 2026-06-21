export interface PrintExperienceEntry {
  title: string;
  company: string;
  period: string;
  bullets: string[];
}

export const PRINT_EXPERIENCE: PrintExperienceEntry[] = [
  {
    title: "Senior Full-Stack Engineer",
    company: "DeFi Protocol — Remote",
    period: "2023 – Present",
    bullets: [
      "Built high-throughput order-book engine processing 50k events/s with sub-10 ms p99 latency.",
      "Designed EVM smart-contract settlement layer; audited and deployed to mainnet.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Web3 Startup — Hong Kong",
    period: "2021 – 2023",
    bullets: [
      "Architected multi-tenant Next.js platform serving 200k monthly active users.",
      "Reduced cloud spend 35% by migrating batch jobs to edge-computed workers.",
    ],
  },
  {
    title: "Frontend Engineer",
    company: "SaaS Company — Shenzhen",
    period: "2020 – 2021",
    bullets: [
      "Rebuilt customer dashboard with React + TypeScript, cutting load time by 60%.",
      "Shipped component library adopted across 4 product teams.",
    ],
  },
  {
    title: "Junior Developer",
    company: "Agency — Guangzhou",
    period: "2019 – 2020",
    bullets: [
      "Delivered 12 client websites using Next.js and headless CMS integrations.",
      "Introduced automated CI/CD pipelines, eliminating manual deployment steps.",
    ],
  },
];
