"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

const DEPTHS = [25, 50, 75, 100] as const;

export default function ScrollDepthTracker() {
  const firedRef = useRef(new Set<number>());
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fired = firedRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const depth = Number(
              (entry.target as HTMLElement).dataset.depth
            );
            if (!fired.has(depth)) {
              fired.add(depth);
              track("scroll_depth", { depth });
            }
          }
        }
      },
      { threshold: 0 }
    );

    for (const el of sentinelRefs.current) {
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[-1]">
      {DEPTHS.map((depth, i) => (
        <div
          key={depth}
          data-depth={depth}
          ref={(el) => { sentinelRefs.current[i] = el; }}
          className="absolute h-px w-px"
          style={{ top: `${depth}%` }}
        />
      ))}
    </div>
  );
}
