import type { JSX } from "react";

import Link from "next/link";
import profileData from "@/data/profile.json";

export default function HeroSection(): JSX.Element {
  return (
    <section
      id="home"
      className="relative min-h-[921px] flex flex-col items-center justify-center overflow-hidden px-6 py-20 grid-bg"
      aria-label="Hero"
    >
      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#121414]/50 to-[#121414] z-0 pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div className="mb-4 inline-block px-2 py-1 border border-[#aec6ff]/30 rounded-full bg-[#aec6ff]/5">
          <span className="font-mono text-sm font-medium leading-[1.4] tracking-[0.15em] text-[#aec6ff] uppercase">
            {profileData.headline}
          </span>
        </div>

        {/* H1 */}
        <h1 className="text-[64px] leading-[1.1] font-extrabold tracking-[-0.04em] mb-4 text-[#e3e2e2]">
          {profileData.name}{" "}
          <span className="text-[#508eff]">|</span>
          <br className="hidden md:block" />
          {" "}Architecting Performance
        </h1>

        {/* Subtext */}
        <p className="text-lg leading-[1.6] text-[#8e9192] max-w-2xl mx-auto mb-10">
          {profileData.summary}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={"/projects" as import("next").Route}
            className="px-10 py-4 bg-[#508eff] text-[#00275e] text-2xl font-semibold leading-[1.3] tracking-[-0.01em] rounded-lg hover:shadow-[0_0_30px_rgba(80,142,255,0.4)] transition-all"
          >
            View Projects
          </Link>
          <a
            href="#contact"
            className="px-10 py-4 border border-[#444748] text-[#e3e2e2] text-2xl font-semibold leading-[1.3] tracking-[-0.01em] rounded-lg hover:border-[#aec6ff] transition-all"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Glow orb */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#aec6ff]/10 blur-[120px] rounded-full -z-10 animate-pulse pointer-events-none"
      />
    </section>
  );
}
