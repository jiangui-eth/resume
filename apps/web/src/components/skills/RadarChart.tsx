import skillsData from "@/data/skills.json";

type Dimension = { label: string; score: number; description: string };

const dims: Dimension[] = skillsData.radarDimensions;
const N = dims.length;
const CX = 190;
const CY = 190;
const R = 120;
const LABEL_R = 155;

const angles = dims.map((_, i) => -Math.PI / 2 + (i * 2 * Math.PI) / N);

function pt(fraction: number, i: number): [number, number] {
  return [
    CX + fraction * R * Math.cos(angles[i]),
    CY + fraction * R * Math.sin(angles[i]),
  ];
}

function polygonPoints(fraction: number): string {
  return angles.map((_, i) => pt(fraction, i).join(",")).join(" ");
}

function dataPoints(): string {
  return dims.map((d, i) => pt(d.score / 100, i).join(",")).join(" ");
}

function labelPos(i: number): { x: number; y: number; anchor: "middle" | "end" | "start" } {
  const x = CX + LABEL_R * Math.cos(angles[i]);
  const y = CY + LABEL_R * Math.sin(angles[i]);
  const anchor: "middle" | "end" | "start" =
    Math.abs(x - CX) < 8 ? "middle" : x < CX ? "end" : "start";
  return { x, y, anchor };
}

const GRID_LEVELS = [25, 50, 75, 100];

const DOMAIN_BULLETS = [
  "Frontend Core: Master (Next.js/React)",
  "AI/RAG: Advanced Implementation",
  "Performance: Core Web Vitals Specialist",
];

export default function RadarChart() {
  return (
    <section className="max-w-300 mx-auto px-6 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left column */}
        <div className="lg:col-span-5">
          <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.02em] text-white mb-4">
            Core Domains
          </h2>
          <p className="text-base text-[#8e9192] mb-6 leading-relaxed">
            A visual distribution of my expertise across the modern frontend landscape. While my
            foundation is in core frontend engineering, I have pivoted significantly towards
            AI-native application layers and high-performance graphics.
          </p>
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
                      x1={CX}
                      y1={CY}
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

                {dims.map((d, i) => {
                  const { x, y, anchor } = labelPos(i);
                  return (
                    <text
                      key={i}
                      x={x}
                      y={y + 4}
                      textAnchor={anchor}
                      fontSize="11"
                      fill="#e3e2e2"
                      fontFamily="ui-monospace, monospace"
                    >
                      {d.label}
                    </text>
                  );
                })}
              </svg>
            </div>
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
    </section>
  );
}
