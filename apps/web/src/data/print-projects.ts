export interface PrintProjectEntry {
  name: string;
  description: string;
  tags: string[];
}

export const PRINT_PROJECTS: PrintProjectEntry[] = [
  {
    name: "On-chain Order Book",
    description:
      "Fully decentralised limit-order protocol on EVM; 0 downtime in 18 months.",
    tags: ["Solidity", "TypeScript", "Foundry"],
  },
  {
    name: "Edge Analytics Platform",
    description:
      "Real-time event pipeline processing 2 B events/day with p95 <5 ms.",
    tags: ["Go", "Kafka", "ClickHouse"],
  },
  {
    name: "Multi-chain Wallet SDK",
    description:
      "Unified SDK abstracting EVM + Cosmos signing; 12 k weekly downloads.",
    tags: ["TypeScript", "Viem", "CosmJS"],
  },
  {
    name: "Resume Portfolio",
    description:
      "Next.js 16 App Router portfolio with Framer Motion animations and print view.",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
  },
];
