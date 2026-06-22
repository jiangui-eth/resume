"use client";

import { cn } from "@jiangui-resume/ui/lib/utils";
import { useTranslations } from "next-intl";
import React from "react";

export interface ContactCardConfig {
  icon: string;
  label: string;
  value: string;
  href?: string;
  reveal?: boolean;
}

const MASKED = "••••••••";

export default function ContactCard({
  icon,
  label,
  value,
  href,
  reveal,
}: ContactCardConfig): React.JSX.Element {
  const t = useTranslations("contact");
  const [revealed, setRevealed] = React.useState(false);
  const fallback = t("notConfigured");
  const display = reveal
    ? revealed
      ? value || fallback
      : MASKED
    : value || fallback;

  return (
    <article className="glass-card flex items-center gap-4 p-6">
      {/* Icon circle */}
      <div className="bg-ds-accent/10 text-ds-accent flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
        <span className="material-symbols-outlined" aria-hidden="true">
          {icon}
        </span>
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1 text-left">
        <p className="text-ds-muted font-mono text-sm leading-[1.4] font-medium tracking-[0.02em]">
          {label}
        </p>
        {href && !reveal ? (
          <a
            href={href}
            className="text-ds-fg hover:text-ds-accent block truncate text-2xl leading-[1.3] font-semibold tracking-[-0.01em] transition-colors"
          >
            {display}
          </a>
        ) : (
          <p
            className={cn(
              "truncate text-2xl leading-[1.3] font-semibold tracking-[-0.01em]",
              reveal && !revealed
                ? "text-ds-fg/20 tracking-widest"
                : "text-ds-fg",
            )}
          >
            {display}
          </p>
        )}
      </div>

      {/* Reveal toggle */}
      {reveal && (
        <button
          onClick={() => setRevealed((r) => !r)}
          className="border-ds-border-2/40 text-ds-muted hover:text-ds-fg flex shrink-0 items-center gap-1 rounded border bg-[rgba(255,255,255,0.03)] px-3 py-1.5 font-mono text-xs transition-colors"
          aria-label={revealed ? `Hide ${label}` : `Reveal ${label}`}
        >
          <span
            className="material-symbols-outlined text-base"
            aria-hidden="true"
          >
            {revealed ? "visibility_off" : "visibility"}
          </span>
          {revealed ? t("hide") : t("reveal")}
        </button>
      )}
    </article>
  );
}
