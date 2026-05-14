import experiencesData from "@/data/experiences.json";
import type { Experience } from "@/types/experience";

import TimelineCard from "./TimelineCard";

const EXPERIENCES = experiencesData as Experience[];

export default function Timeline() {
  return (
    <div id="timeline-placeholder" className="relative py-6 md:py-10">
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-5 top-0 w-px -translate-x-1/2 md:left-1/2"
        style={{
          background:
            "linear-gradient(180deg, rgba(147,197,253,0.3), rgba(196,181,253,0.1))",
        }}
      />

      <div className="flex flex-col gap-8 md:gap-10">
        {EXPERIENCES.map((experience, index) => (
          <TimelineCard
            key={experience.id}
            experience={experience}
            index={index}
            side={index % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>
    </div>
  );
}
