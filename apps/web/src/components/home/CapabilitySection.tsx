// ── Types ──────────────────────────────────────────────────────────────────────

interface Capability {
  icon: string; // Material Symbols icon name
  title: string;
  bullets: string[];
}

// ── Data ───────────────────────────────────────────────────────────────────────

const CAPABILITIES: Capability[] = [
  {
    icon: "terminal",
    title: "Next.js / React",
    bullets: [
      "SSR & ISR Architectures",
      "App Router Expertise",
      "React Server Components",
    ],
  },
  {
    icon: "bolt",
    title: "Performance",
    bullets: [
      "Core Web Vitals (LCP/INP)",
      "WASM Integration",
      "Runtime Optimization",
    ],
  },
  {
    icon: "psychology",
    title: "AI & RAG",
    bullets: [
      "LLM Orchestration (LangChain)",
      "Vector Database Optimization",
      "Prompt Engineering",
    ],
  },
  {
    icon: "layers",
    title: "Engineering",
    bullets: [
      "Monorepos (Turborepo)",
      "Design System Architecture",
      "CI/CD Pipeline Design",
    ],
  },
];

// ── CapabilityCard ─────────────────────────────────────────────────────────────

function CapabilityCard({ icon, title, bullets }: Capability) {
  return (
    <article className="group glass-card p-10 flex flex-col gap-6 relative overflow-hidden">
      {/* Glow orb */}
      <div
        aria-hidden="true"
        className="absolute -top-12 -right-12 w-24 h-24 bg-[#aec6ff]/10 blur-2xl rounded-full group-hover:bg-[#aec6ff]/20 transition-colors pointer-events-none"
      />

      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-[#aec6ff]/10 flex items-center justify-center border border-[#aec6ff]/20 group-hover:border-[#aec6ff]/50 transition-all">
        <span
          className="material-symbols-outlined text-[#508eff] text-[28px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
          aria-hidden="true"
        >
          {icon}
        </span>
      </div>

      {/* Content */}
      <div>
        <h4 className="text-2xl font-semibold leading-[1.3] tracking-[-0.01em] text-[#e3e2e2] mb-2">
          {title}
        </h4>
        <ul className="flex flex-col gap-2" role="list">
          {bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-center gap-2 font-mono text-sm font-medium leading-[1.4] tracking-[0.02em] text-[#8e9192]"
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#508eff] shrink-0"
                aria-hidden="true"
              />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

// ── CapabilitySection ──────────────────────────────────────────────────────────

export default function CapabilitySection() {
  return (
    <section
      id="capabilities"
      className="bg-[#121414] py-20 relative overflow-hidden"
      aria-label="Technical Arsenal"
    >
      {/* Grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-bg opacity-30 pointer-events-none"
      />
      {/* Top fade */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-[#121414] to-transparent pointer-events-none"
      />

      <div className="max-w-300 mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full border border-[#aec6ff]/20 bg-[#aec6ff]/5 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#aec6ff] animate-pulse" aria-hidden="true" />
            <span className="font-mono text-sm font-medium leading-[1.4] tracking-[0.15em] text-[#aec6ff] uppercase">
              Expertise
            </span>
          </div>
          <h3 className="text-[64px] leading-[1.1] font-extrabold tracking-[-0.04em] text-[#e3e2e2] mb-1">
            Technical Arsenal
          </h3>
          <p className="text-lg leading-[1.6] text-[#8e9192] max-w-2xl">
            Engineered for performance and scalability using modern architectural patterns.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAPABILITIES.map((cap) => (
            <CapabilityCard key={cap.title} {...cap} />
          ))}
        </div>
      </div>
    </section>
  );
}
