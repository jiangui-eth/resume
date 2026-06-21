import type { JSX } from "react";
import type { ProjectBlockData } from "../types";
import Image from "next/image";
import MetricBadge from "../MetricBadge";

export function GridPanel({
  project,
}: {
  project: ProjectBlockData;
}): JSX.Element {
  const image = project.images[0];
  const label = project.metricsLabel ?? "Performance Metrics";

  return (
    <div className="glass-card flex h-full flex-col rounded-xl p-6">
      <p className="mb-4 font-mono text-xs font-medium tracking-widest text-[#8e9192] uppercase">
        {label}
      </p>
      {project.metrics.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {project.metrics.map((metric) => (
            <MetricBadge
              key={`${metric.label}-${metric.value}`}
              value={metric.value}
              label={metric.label}
            />
          ))}
        </div>
      )}
      {image?.src ? (
        <div className="relative mt-6 aspect-video overflow-hidden rounded-lg">
          <Image
            src={image.src}
            alt={image.alt || project.name}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover opacity-80 grayscale transition-opacity hover:opacity-100 hover:grayscale-0"
          />
        </div>
      ) : (
        project.metrics.length === 0 && (
          <div className="mt-6 flex aspect-video items-center justify-center rounded-lg border border-[#333333]/30 bg-[#121414]">
            <div className="text-center">
              <div className="text-sm font-medium tracking-[0.3em] text-white/30 uppercase">
                Visual Pending
              </div>
              <div className="mt-2 text-base text-white/50">{project.name}</div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
