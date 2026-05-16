"use client";

import { useRef, type JSX } from "react";
import { motion, useInView } from "framer-motion";

import type { Experience } from "@/types/experience";
import { formatDate } from "@/lib/utils";

import TechTag from "@/components/ui/TechTag";

/**
 * `side="left"` places the date panel on the left, card on the right; "right" reverses it.
 * On mobile only the article card is shown. Animation triggers once on viewport entry via Framer Motion useInView.
 */
interface TimelineCardProps {
  experience: Experience;
  index: number;
  side: "left" | "right";
}

interface TimelineCardArticleProps {
  experience: Experience;
  isPresent: boolean;
  startLabel: string;
  endLabel: string;
}

function TimelineCardArticle({ experience, isPresent, startLabel, endLabel }: TimelineCardArticleProps): JSX.Element {
  return (
    <article className="glass-card p-6 rounded-xl">
      {/* Mobile date/company header */}
      <div className="md:hidden mb-4">
        <p className="text-sm font-medium text-[#aec6ff]">
          {startLabel} {"–"}{" "}
          <span className={isPresent ? "font-semibold" : "text-white/60"}>
            {endLabel}
          </span>
        </p>
        <p className="text-base font-semibold text-white mt-0.5">{experience.company}</p>
      </div>

      {/* Role label */}
      <p className="text-xs font-medium uppercase tracking-wider text-[#8e9192] mb-4">
        {experience.title}
      </p>

      {/* Highlight badge */}
      {experience.highlight ? (
        <span className="inline-block mb-4 rounded border border-[#508eff]/30 px-2 py-0.5 text-xs font-mono text-[#508eff]">
          {experience.highlight}
        </span>
      ) : null}

      {/* Bullet list */}
      <ul className="space-y-2 mb-4">
        {experience.responsibilities.map((responsibility) => (
          <li key={responsibility} className="flex items-start gap-2 text-sm text-white/60">
            <span
              aria-hidden="true"
              className="material-symbols-outlined text-[#aec6ff] shrink-0"
              style={{ fontSize: "16px", lineHeight: "1.5" }}
            >
              arrow_right
            </span>
            <span>{responsibility}</span>
          </li>
        ))}
      </ul>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2">
        {experience.techTags.map((tag) => (
          <TechTag key={tag} label={tag} />
        ))}
      </div>
    </article>
  );
}

export default function TimelineCard({
  experience,
  index,
  side,
}: TimelineCardProps): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView =
    typeof IntersectionObserver === "undefined"
      ? true
      : useInView(ref, { once: true, amount: 0.2 });
  const isPresent = experience.period.end === "present";
  const startLabel = formatDate(experience.period.start);
  const endLabel = isPresent ? "Present" : formatDate(experience.period.end);
  const isCardRight = side === "left";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
      className={`flex flex-col ${isCardRight ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-6 md:gap-0`}
    >
      {/* Date/company panel — desktop only */}
      <div
        className={`hidden md:flex w-1/2 px-8 ${isCardRight ? "justify-end" : "justify-start"}`}
      >
        <div className={isCardRight ? "text-right" : "text-left"}>
          <p className="text-sm font-medium text-[#aec6ff]">
            {startLabel} {"–"}{" "}
            <span className={isPresent ? "text-[#aec6ff] font-semibold" : "text-white/60"}>
              {endLabel}
            </span>
          </p>
          {experience.companyUrl ? (
            <a
              href={experience.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-semibold text-white hover:text-[#aec6ff] transition-colors"
            >
              {experience.company}
            </a>
          ) : (
            <p className="text-base font-semibold text-white">{experience.company}</p>
          )}
        </div>
      </div>

      {/* Center dot */}
      <div className="relative z-10 shrink-0">
        <span
          aria-hidden="true"
          className={`block w-4 h-4 rounded-full border-4 border-[#121414] ring-4 ring-[#aec6ff]/20 ${
            isPresent ? "animate-pulse bg-[#aec6ff]" : "bg-[#aec6ff]"
          }`}
        />
      </div>

      {/* Card */}
      <div className="w-full md:w-1/2 px-0 md:px-8">
        <TimelineCardArticle
          experience={experience}
          isPresent={isPresent}
          startLabel={startLabel}
          endLabel={endLabel}
        />
      </div>
    </motion.div>
  );
}
