const PROJECTS = [
  {
    name: "On-chain Order Book",
    description: "Fully decentralised limit-order protocol on EVM; 0 downtime in 18 months.",
    tags: ["Solidity", "TypeScript", "Foundry"],
  },
  {
    name: "Edge Analytics Platform",
    description: "Real-time event pipeline processing 2 B events/day with p95 <5 ms.",
    tags: ["Go", "Kafka", "ClickHouse"],
  },
  {
    name: "Multi-chain Wallet SDK",
    description: "Unified SDK abstracting EVM + Cosmos signing; 12 k weekly downloads.",
    tags: ["TypeScript", "Viem", "CosmJS"],
  },
  {
    name: "Resume Portfolio",
    description: "Next.js 16 App Router portfolio with Framer Motion animations and print view.",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
  },
];

export default function PrintProjects() {
  return (
    <section>
      <h2 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-1 mb-4">
        Key Projects
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {PROJECTS.map((proj) => (
          <div
            key={proj.name}
            className="print-entry rounded border border-gray-200 p-3"
          >
            <h3 className="text-[11px] font-semibold text-gray-900 mb-0.5">{proj.name}</h3>
            <p className="text-[10px] text-gray-600 leading-snug mb-1.5">{proj.description}</p>
            <div className="flex flex-wrap gap-1">
              {proj.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] border border-gray-200 rounded px-1 py-0.5 text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
