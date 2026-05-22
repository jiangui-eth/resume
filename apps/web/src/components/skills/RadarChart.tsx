import type { JSX } from "react";

import skillsData from "@/data/skills.json";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";

type Dimension = { label: string; score: number; description: string };

const dims: Dimension[] = skillsData.radarDimensions;
const pointCount = dims.length;
const centerX = 190;
const centerY = 190;
const radius = 120;

const angles = dims.map((_, i) => -Math.PI / 2 + (i * 2 * Math.PI) / pointCount);

function pt(fraction: number, i: number): [number, number] {
  return [
    centerX + fraction * radius * Math.cos(angles[i]),
    centerY + fraction * radius * Math.sin(angles[i]),
  ];
}

function polygonPoints(fraction: number): string {
  return angles.map((_, i) => pt(fraction, i).join(",")).join(" ");
}

function dataPoints(): string {
  return dims.map((d, i) => pt(d.score / 100, i).join(",")).join(" ");
}

const GRID_LEVELS = [25, 50, 75, 100];

// Absolute-positioned label slots — one per pentagon vertex, matching Figma layout
const LABEL_CLASSES: string[] = [
  "absolute top-4 left-1/2 -translate-x-1/2 text-center",   // dims[0] top
  "absolute top-1/3 right-0 text-right",                     // dims[1] top-right
  "absolute bottom-8 right-12",                               // dims[2] bottom-right
  "absolute bottom-8 left-12",                                // dims[3] bottom-left
  "absolute top-1/3 left-0",                                  // dims[4] top-left
];

const DOMAIN_BULLETS = [
  "前端核心：Next.js / React 精通",
  "AI / RAG：深度实现能力",
  "性能优化：Core Web Vitals 专项",
];

export default function RadarChart(): JSX.Element {
  return (
    <SectionWrapper className="pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left column */}
        <div className="lg:col-span-5">
          <SectionHeader
            title="核心领域"
            subtitle="我在现代前端领域的专业技能分布，核心基础是前端工程化，同时在 AI 应用开发与高性能图形渲染方向持续深耕。"
          />
          <ul className="space-y-4" aria-label="Core domain highlights">
            {DOMAIN_BULLETS.map((bullet) => (
              <li key={bullet} className="flex items-center gap-2">
                <div className="w-2 h-2 shrink-0 rounded-full bg-[#aec6ff]" />
                <span className="text-base text-[#e3e2e2]">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column — radar chart */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="glass-card p-6 rounded-xl w-full max-w-125 aspect-square flex items-center justify-center relative">
            <div className="absolute inset-0 p-6" aria-hidden="true">
              <svg
                viewBox="0 0 380 380"
                className="w-full h-full"
                aria-label="Radar chart showing skill dimensions"
              >
                {GRID_LEVELS.map((level) => (
                  <polygon
                    key={level}
                    points={polygonPoints(level / 100)}
                    fill="none"
                    stroke="#333333"
                    strokeWidth="0.8"
                  />
                ))}

                {angles.map((_, i) => {
                  const [x, y] = pt(1, i);
                  return (
                    <line
                      key={i}
                      x1={centerX}
                      y1={centerY}
                      x2={x}
                      y2={y}
                      stroke="#333333"
                      strokeWidth="0.8"
                    />
                  );
                })}

                <polygon
                  points={dataPoints()}
                  fill="rgba(174,198,255,0.1)"
                  stroke="#aec6ff"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />

                {dims.map((d, i) => {
                  const [x, y] = pt(d.score / 100, i);
                  return <circle key={i} cx={x} cy={y} r="3" fill="#aec6ff" />;
                })}

              </svg>
            </div>

            {/* HTML labels — positioned outside SVG to avoid viewBox clipping */}
            {dims.map((d, i) => (
              <div key={d.label} className={`${LABEL_CLASSES[i]} font-mono text-xs text-[#e3e2e2] leading-tight`}>
                {d.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accessible text list */}
      <ul className="sr-only" aria-label="Skill scores">
        {dims.map((d) => (
          <li key={d.label} className="flex items-center justify-between text-sm">
            <span>{d.label}</span>
            <span>{d.score}%</span>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}
