const EXPERIENCE = [
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

export default function PrintExperience() {
  return (
    <section>
      <h2 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-1 mb-4">
        Professional Experience
      </h2>
      <div className="space-y-5">
        {EXPERIENCE.map((exp) => (
          <div key={exp.company} className="print-entry">
            <div className="flex items-baseline justify-between">
              <h3 className="text-sm font-semibold text-gray-900">{exp.title}</h3>
              <span className="text-[11px] text-gray-500 shrink-0 ml-2">{exp.period}</span>
            </div>
            <p className="text-[11px] text-blue-700 mb-1">{exp.company}</p>
            <ul className="list-disc list-inside space-y-0.5">
              {exp.bullets.map((b) => (
                <li key={b} className="text-[11px] text-gray-700 leading-snug">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
