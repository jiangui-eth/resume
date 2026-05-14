import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import profileData from "@/data/profile.json";

// ── Types ──────────────────────────────────────────────────────────────────────

interface StatItem {
  value: string;
  label: string;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const STATS: StatItem[] = [
  { value: `${profileData.stats.yearsExperience}+`, label: "Years Experience" },
  { value: `${profileData.stats.projectsShipped}`, label: "Projects Shipped" },
  { value: profileData.stats.avgLatency, label: "Avg Load Time" },
  { value: `${profileData.stats.performanceScore}+`, label: "Lighthouse Score" },
];

// ── HeroSection ────────────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden"
      style={{ background: "#0a0a0f" }}
      aria-label="Hero"
    >
      {/* ── Spotlight radial-gradient ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 65% at 50% 38%, rgba(59,130,246,0.20) 0%, rgba(147,51,234,0.14) 38%, rgba(236,72,153,0.06) 60%, transparent 75%)",
        }}
      />

      {/* ── Subtle dot-grid texture ───────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-24 text-center">

        {/* Top badge */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
            {profileData.headline}
          </span>
        </div>

        {/* Main title */}
        <h1
          className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both delay-150 mt-8 text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #93c5fd 0%, #c4b5fd 45%, #f9a8d4 100%)",
            }}
          >
            jiangui.eth
          </span>
          <br />
          <span className="text-white/90">Architecting</span>{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)",
            }}
          >
            Performance
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both delay-300 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg"
        >
          {profileData.summary}
        </p>

        {/* CTA buttons */}
        <div
          className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both delay-500 mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <Link
            href={"/projects" as import("next").Route}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:bg-blue-500 hover:shadow-blue-500/35 active:scale-95"
          >
            View Projects
            <ArrowRight size={15} />
          </Link>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 backdrop-blur-sm transition-all duration-200 hover:border-white/25 hover:bg-white/10 active:scale-95"
          >
            <Mail size={15} />
            Get in Touch
          </a>
        </div>

        {/* Stats row */}
        <div
          className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both delay-700 mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-6"
        >
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span
                className="text-2xl font-bold tabular-nums bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #93c5fd, #c4b5fd)",
                }}
              >
                {value}
              </span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-white/40">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────────────── */}
      <div
        className="animate-in fade-in duration-1000 fill-mode-both delay-1000 pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/25">
          Scroll
        </span>
        <div className="h-8 w-px bg-gradient-to-b from-white/25 to-transparent" />
      </div>
    </section>
  );
}
