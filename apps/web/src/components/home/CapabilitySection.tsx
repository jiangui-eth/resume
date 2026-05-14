import { type LucideIcon, Layers2, Zap, Brain, Wrench } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

interface Capability {
  icon: LucideIcon;
  title: string;
  bullets: string[];
  accentColor: string; // tailwind arbitrary color for icon + glow
  glowColor: string;   // inline rgba for hover box-shadow
}

// ── Data ───────────────────────────────────────────────────────────────────────

const CAPABILITIES: Capability[] = [
  {
    icon: Layers2,
    title: "Next.js / React",
    bullets: [
      "App Router, RSC & streaming SSR",
      "Turborepo monorepo at scale",
      "Design systems & component libraries",
      "Tailwind CSS with custom design tokens",
    ],
    accentColor: "text-blue-400",
    glowColor: "rgba(59,130,246,0.18)",
  },
  {
    icon: Zap,
    title: "Performance",
    bullets: [
      "Core Web Vitals optimisation (LCP, CLS, INP)",
      "Code splitting & bundle analysis",
      "SSR / ISR caching strategies",
      "Lighthouse CI in every PR pipeline",
    ],
    accentColor: "text-yellow-400",
    glowColor: "rgba(234,179,8,0.18)",
  },
  {
    icon: Brain,
    title: "AI & RAG",
    bullets: [
      "LLM API integration (OpenAI, Anthropic)",
      "Retrieval-augmented generation pipelines",
      "Vercel AI SDK streaming responses",
      "Prompt engineering & agent tooling",
    ],
    accentColor: "text-purple-400",
    glowColor: "rgba(168,85,247,0.18)",
  },
  {
    icon: Wrench,
    title: "Engineering",
    bullets: [
      "TypeScript across the full stack",
      "Docker · Kubernetes · GitHub Actions",
      "tRPC + Zod end-to-end type safety",
      "GitOps workflows & CI/CD automation",
    ],
    accentColor: "text-emerald-400",
    glowColor: "rgba(52,211,153,0.18)",
  },
];

// ── CapabilityCard ─────────────────────────────────────────────────────────────

function CapabilityCard({ icon: Icon, title, bullets, accentColor, glowColor }: Capability) {
  return (
    <article
      className="group relative flex flex-col gap-5 rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05]"
      style={
        {
          "--glow": glowColor,
        } as React.CSSProperties
      }
    >
      {/* Hover glow pseudo-layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `0 0 32px 4px var(--glow), inset 0 0 20px 2px var(--glow)` }}
      />

      {/* Icon */}
      <div className={`w-fit rounded-xl border border-white/10 bg-white/[0.05] p-3 ${accentColor}`}>
        <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-white">{title}</h3>

      {/* Bullets */}
      <ul className="flex flex-col gap-2" role="list">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2 text-sm leading-relaxed text-white/50">
            <span className={`mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full ${accentColor} opacity-70`} aria-hidden="true" />
            {bullet}
          </li>
        ))}
      </ul>
    </article>
  );
}

// ── CapabilitySection ──────────────────────────────────────────────────────────

export default function CapabilitySection() {
  return (
    <section
      id="capabilities"
      className="relative overflow-hidden"
      style={{ background: "#0a0a0f" }}
      aria-label="Technical Arsenal"
    >
      {/* Top separator */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(147,197,253,0.15), rgba(196,181,253,0.15), transparent)",
        }}
      />

      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both mb-12 flex flex-col gap-3">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300">
            Technical Arsenal
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built to ship,{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #93c5fd 0%, #c4b5fd 60%, #f9a8d4 100%)",
              }}
            >
              wired for scale.
            </span>
          </h2>
        </div>

        {/* Cards grid */}
        <div
          className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both delay-150 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          role="list"
        >
          {CAPABILITIES.map((cap) => (
            <CapabilityCard key={cap.title} {...cap} />
          ))}
        </div>
      </div>
    </section>
  );
}
