import { cn } from "@jiangui-resume/ui/lib/utils";
import * as React from "react";

export interface CardProps {
  variant?: "elevated" | "filled" | "outlined";
  clickable?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const variantBase: Record<NonNullable<CardProps["variant"]>, string> = {
  elevated: "bg-ds-surface elevation-1",
  filled: "bg-ds-surface-variant",
  outlined: "bg-ds-surface border border-ds-outline-variant",
};

const variantStateColor: Record<NonNullable<CardProps["variant"]>, string> = {
  elevated: "var(--ds-color-on-surface)",
  filled: "var(--ds-color-on-surface-variant)",
  outlined: "var(--ds-color-on-surface)",
};

export function Card({
  variant = "elevated",
  clickable = false,
  children,
  className,
  onClick,
}: CardProps) {
  const Comp = clickable ? "button" : "div";

  return (
    <Comp
      onClick={clickable ? onClick : undefined}
      className={cn(
        "overflow-hidden rounded-ds-md text-ds-on-surface",
        variantBase[variant],
        clickable && "state-layer cursor-pointer text-left",
        className,
      )}
      style={
        clickable
          ? ({
              "--state-layer-color": variantStateColor[variant],
            } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </Comp>
  );
}
