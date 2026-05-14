import Image from "next/image";

import profileData from "@/data/profile.json";

// ── Types ──────────────────────────────────────────────────────────────────────

interface StatItem {
  value: string;
  label: string;
  description: string;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const STATS: StatItem[] = [
  {
    value: "14×",
    label: "SEO Growth",
    description: "Organic traffic lift via structured-data & Core Web Vitals",
  },
  {
    value: "1.8s",
    label: "LCP",
    description: "Largest Contentful Paint on production homepage",
  },
  {
    value: "80%",
    label: "Build Speed",
    description: "Faster CI/CD with incremental Turborepo caching",
  },
];

// ── StatCard ───────────────────────────────────────────────────────────────────

function StatCard({ value, label, description }: StatItem) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-white/8 bg-white/[0.03] p-4">
      <span
        className="text-3xl font-bold tabular-nums bg-clip-text text-transparent leading-tight"
        style={{
          backgroundImage: "linear-gradient(135deg, #93c5fd, #c4b5fd)",
        }}
      >
        {value}
      </span>
      <span className="text-sm font-semibold text-white/80">{label}</span>
      <span className="text-xs leading-relaxed text-white/40">{description}</span>
    </div>
  );
}

// ── AboutSection ───────────────────────────────────────────────────────────────

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ background: "#0a0a0f" }}
      aria-label="About"
    >
      {/* Subtle top separator */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(147,197,253,0.25), rgba(196,181,253,0.25), transparent)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-300">
            Precision in Every Pixel
          </span>
        </div>

        {/* Two-column grid: text left, photo right */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">

          {/* ── Left: bio + stats ─────────────────────────────────────────── */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both delay-150 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                Building for{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #93c5fd 0%, #c4b5fd 60%, #f9a8d4 100%)",
                  }}
                >
                  performance
                </span>
                ,<br />
                shipping with intent.
              </h2>
              <p className="text-base leading-relaxed text-white/55 sm:text-lg">
                {profileData.summary}
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {STATS.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </div>

          {/* ── Right: avatar card ────────────────────────────────────────── */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both delay-300 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow halo behind card */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 rounded-3xl opacity-40 blur-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(147,197,253,0.25) 0%, rgba(196,181,253,0.18) 50%, transparent 75%)",
                }}
              />

              {/* Photo card */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40">
                <Image
                  src={profileData.avatarUrl}
                  alt={`${profileData.name} — ${profileData.headline}`}
                  width={400}
                  height={480}
                  priority
                  className="block object-cover"
                  style={{ width: "clamp(260px, 38vw, 400px)", height: "auto", aspectRatio: "5/6" }}
                />

                {/* Name tag overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 px-5 py-4"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,10,15,0.92) 0%, rgba(10,10,15,0.6) 60%, transparent 100%)",
                  }}
                >
                  <p className="text-sm font-semibold text-white">{profileData.ens}</p>
                  <p className="text-xs text-white/50">{profileData.headline}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
