"use client";

import { cn } from "@jiangui-resume/ui/lib/utils";
import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outlined" | "text" | "fab";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const variantBase: Record<NonNullable<ButtonProps["variant"]>, string> = {
  filled: "bg-ds-primary",
  outlined: "bg-transparent border border-ds-outline",
  text: "bg-transparent",
  fab: "bg-ds-primary-container elevation-3 rounded-ds-lg",
};

const variantColor: Record<NonNullable<ButtonProps["variant"]>, string> = {
  filled: "var(--ds-color-on-primary)",
  outlined: "var(--ds-color-primary)",
  text: "var(--ds-color-primary)",
  fab: "var(--ds-color-on-primary-container)",
};

const sizeBase: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-8 px-4 text-label-small rounded-ds-sm gap-1",
  md: "h-10 px-6 text-label-large rounded-ds-md gap-2",
  lg: "h-12 px-8 text-label-large rounded-ds-lg gap-2",
};

export function Button({
  variant = "filled",
  size = "md",
  loading = false,
  icon,
  children,
  disabled,
  className,
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        "state-layer inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-opacity outline-none select-none",
        "focus-visible:ring-2 focus-visible:ring-ds-primary focus-visible:ring-offset-2",
        variantBase[variant],
        variant !== "fab" && sizeBase[size],
        variant === "fab" && "size-14",
        (disabled || loading) &&
          "pointer-events-none opacity-[var(--ds-state-disabled-container)]",
        className,
      )}
      style={
        {
          color: variantColor[variant],
          "--state-layer-color": variantColor[variant],
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {loading ? (
        <span
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      ) : (
        icon
      )}
      {children}
    </button>
  );
}
