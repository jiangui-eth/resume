import { Zap, Radio, Palette, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import skillsData from "@/data/skills.json";

type Card = {
  id: string;
  title: string;
  description: string;
  tags: string[];
};

const ICON_MAP: Record<string, LucideIcon> = {
  "btc-001": Zap,
  "btc-002": Radio,
  "btc-003": Palette,
  "btc-004": Wrench,
};

const cards: Card[] = skillsData.battleTestedCards;

export default function ExpertiseCards() {
  return (
    <div
      className="border-t border-white/10"
      style={{ background: "#0a0a0f" }}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-2xl font-bold tracking-tight text-white/90">
          Battle-Tested Expertise
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const Icon = ICON_MAP[card.id] ?? Zap;
            return (
              <div
                key={card.id}
                className="group rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_24px_-4px_rgba(59,130,246,0.25)]"
              >
                <div className="mb-4 inline-flex rounded-lg border border-blue-500/20 bg-blue-500/10 p-2.5 text-blue-400">
                  <Icon size={18} />
                </div>
                <h3 className="mb-2 text-sm font-semibold text-white/90">
                  {card.title}
                </h3>
                <p className="text-xs leading-relaxed text-white/50">
                  {card.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
