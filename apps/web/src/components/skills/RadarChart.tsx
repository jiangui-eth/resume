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

export default function RadarChart() {
  return (
    <div className="relative w-full">
      {/* Chart — hidden when prefers-reduced-motion */}
      <div className="motion-reduce:hidden" aria-hidden="true">
        <svg
          viewBox="0 0 380 380"
          className="w-full max-w-sm mx-auto"
          aria-label="Radar chart showing skill dimensions"
        >
          {/* Grid rings */}
          {GRID_LEVELS.map((level) => (
            <polygon
              key={level}
              points={polygonPoints(level / 100)}
              fill="none"
              stroke="rgba(147,197,253,0.12)"
              strokeWidth="1"
            />
          ))}

          {/* Axis lines from center to each vertex */}
          {angles.map((a, i) => {
            const [x, y] = pt(1, i);
            return (
              <line
                key={i}
                x1={CX}
                y1={CY}
                x2={x}
                y2={y}
                stroke="rgba(147,197,253,0.10)"
                strokeWidth="1"
              />
            );
          })}

          {/* Data polygon */}
          <polygon
            points={dataPoints()}
            fill="rgba(59,130,246,0.20)"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Data dots */}
          {dims.map((d, i) => {
            const [x, y] = pt(d.score / 100, i);
            return (
              <circle key={i} cx={x} cy={y} r="4" fill="#60a5fa" />
            );
          })}

          {/* Labels */}
          {dims.map((d, i) => {
            const { x, y, anchor } = labelPos(i);
            return (
              <text
                key={i}
                x={x}
                y={y + 4}
                textAnchor={anchor}
                fontSize="11"
                fill="rgba(255,255,255,0.60)"
                fontFamily="ui-monospace, monospace"
              >
                {d.label}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Text list — shown when prefers-reduced-motion or JS disabled */}
      <ul className="hidden motion-reduce:block space-y-2" aria-label="Skill scores">
        {dims.map((d) => (
          <li key={d.label} className="flex items-center justify-between text-sm">
            <span className="text-white/70">{d.label}</span>
            <span className="text-blue-400 font-mono tabular-nums">{d.score}%</span>
          </li>
        ))}
      </ul>

      <noscript>
        <ul className="space-y-2 mt-4">
          {dims.map((d) => (
            <li key={d.label} className="flex items-center justify-between text-sm">
              <span className="text-white/70">{d.label}</span>
              <span className="text-blue-400 font-mono">{d.score}%</span>
            </li>
          ))}
        </ul>
      </noscript>
    </div>
  );
}
