"use client";

import { cn } from "@jiangui-resume/ui/lib/utils";
import * as React from "react";

export interface ChipProps {
  variant?: "assist" | "filter" | "input" | "suggestion";
  selected?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  onRemove?: () => void;
}

export function Chip({
  variant = "assist",
  selected = false,
  disabled = false,
  icon,
  trailingIcon,
  label,
  onClick,
  onRemove,
}: ChipProps) {
  const isFilter = variant === "filter";
  const isInput = variant === "input";

  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={isFilter || isInput ? selected : undefined}
      onClick={onClick}
      className={cn(
        "state-layer inline-flex h-8 items-center gap-1 rounded-ds-full border px-4 text-label-large transition-colors outline-none",
        "focus-visible:ring-2 focus-visible:ring-ds-primary focus-visible:ring-offset-1",
        !selected &&
          "border-ds-outline bg-transparent text-ds-on-surface-variant",
        selected &&
          "border-ds-secondary-container bg-ds-secondary-container text-ds-on-secondary-container",
        disabled &&
          "pointer-events-none opacity-[var(--ds-state-disabled-container)]",
      )}
      style={
        {
          "--state-layer-color": selected
            ? "var(--ds-color-on-secondary-container)"
            : "var(--ds-color-on-surface-variant)",
        } as React.CSSProperties
      }
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{label}</span>
      {(trailingIcon ?? isInput) && (
        <span
          role="button"
          aria-label={`Remove ${label}`}
          tabIndex={disabled ? -1 : 0}
          className="shrink-0 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.stopPropagation();
              onRemove?.();
            }
          }}
        >
          {trailingIcon ?? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          )}
        </span>
      )}
    </button>
  );
}
