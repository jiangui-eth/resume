"use client";

import { cn } from "@jiangui-resume/ui/lib/utils";
import * as React from "react";

export interface SnackbarProps {
  open: boolean;
  message: string;
  action?: { label: string; onClick: () => void };
  duration?: number;
  onClose?: () => void;
}

export function Snackbar({
  open,
  message,
  action,
  duration = 4000,
  onClose,
}: SnackbarProps) {
  React.useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4",
        "elevation-3 max-w-[600px] min-w-72 rounded-ds-xs bg-ds-inverse-surface px-4 py-3.5",
        "animate-[snackbar-in_var(--ds-duration-medium-2)_var(--ds-easing-emphasized-decelerate)_forwards]",
      )}
    >
      <p className="flex-1 text-body-medium text-ds-inverse-on-surface">
        {message}
      </p>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="state-layer shrink-0 rounded-ds-xs px-3 py-1.5 text-label-large text-ds-inverse-primary outline-none"
          style={
            {
              "--state-layer-color": "var(--ds-color-inverse-primary)",
            } as React.CSSProperties
          }
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
