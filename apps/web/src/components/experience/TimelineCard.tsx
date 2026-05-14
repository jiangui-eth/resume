"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import type { Experience } from "@/types/experience";

import TechTag from "./TechTag";

interface TimelineCardProps {
  experience: Experience;
  index: number;
  side: "left" | "right";
}

function formatPeriod(value: string) {
  const [year, month] = value.split("-").map(Number);

  return new Date(year, month - 1).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function TimelineCard({
  experience,
  index,
  side,
}: TimelineCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView =
    typeof IntersectionObserver === "undefined"
      ? true
      : useInView(ref, { once: true, amount: 0.2 });
  const isPresent = experience.period.end === "present";
  const startLabel = formatPeriod(experience.period.start);
  const endLabel = isPresent ? "Present" : formatPeriod(experience.period.end);
  const desktopAlignment = side === "left" ? "md:text-right" : "md:text-left";
  const desktopColumn = side === "left" ? "md:col-start-1 md:pr-10" : "md:col-start-2 md:pl-10";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
      className="relative grid grid-cols-1 pl-12 md:grid-cols-2 md:pl-0"
    >
      <div className={`${desktopColumn}`}>
        <article
          className={`rounded-2xl border p-6 transition-all duration-300 hover:bg-white/[0.05] ${desktopAlignment} ${
            isPresent
              ? "border-blue-500/30 bg-white/[0.03] hover:border-blue-400/40"
              : "border-white/8 bg-white/[0.03] hover:border-white/15"
          }`}
        >
          <div
            className={`flex flex-col gap-4 ${side === "left" ? "md:items-end" : "md:items-start"}`}
          >
            <div
              className={`flex flex-wrap items-center gap-2 ${side === "left" ? "md:justify-end" : "md:justify-start"}`}
            >
              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${
                  isPresent
                    ? "border-blue-500/30 bg-blue-500/10 text-white/70"
                    : "border-white/10 bg-white/[0.03] text-white/50"
                }`}
              >
                {startLabel} {"\u2013"}{" "}
                <span className={isPresent ? "text-blue-300" : undefined}>{endLabel}</span>
              </span>
              {experience.highlight ? (
                <span
                  className="rounded border border-blue-400/30 px-2 py-0.5 text-xs font-mono text-blue-300"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(147,197,253,0.08), rgba(196,181,253,0.04))",
                  }}
                >
                  {experience.highlight}
                </span>
              ) : null}
            </div>

            <div className="space-y-1">
              {experience.companyUrl ? (
                <a
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-white/90 transition-colors hover:text-white"
                >
                  {experience.company}
                </a>
              ) : (
                <p className="text-lg font-semibold text-white/90">{experience.company}</p>
              )}
              <p className="text-sm text-white/60">{experience.title}</p>
              <p className="text-xs uppercase tracking-widest text-white/40">
                {experience.location}
              </p>
            </div>

            <ul className="space-y-2">
              {experience.responsibilities.map((responsibility) => (
                <li
                  key={responsibility}
                  className={`flex gap-2 text-sm leading-relaxed text-white/50 ${
                    side === "left" ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <span aria-hidden="true" className="text-white/40">
                    {"\u00b7"}
                  </span>
                  <span>{responsibility}</span>
                </li>
              ))}
            </ul>

            <div
              className={`flex flex-wrap gap-2 ${side === "left" ? "md:justify-end" : "md:justify-start"}`}
            >
              {experience.techTags.map((tag) => (
                <TechTag key={tag} label={tag} />
              ))}
            </div>
          </div>
        </article>
      </div>

      <span
        aria-hidden="true"
        className={`absolute left-5 top-8 h-2.5 w-2.5 -translate-x-1/2 rounded-full md:left-1/2 ${
          isPresent ? "animate-pulse border border-blue-300/40 bg-blue-400 ring-4 ring-blue-500/10" : "bg-white/80"
        }`}
      />
    </motion.div>
  );
}
