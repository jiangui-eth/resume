"use client";

import { cn } from "@jiangui-resume/ui/lib/utils";
import * as React from "react";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function useFocusTrap(
  ref: React.RefObject<HTMLDivElement | null>,
  open: boolean,
  onClose: () => void,
) {
  React.useEffect(() => {
    if (!open || !ref.current) return;
    const el = ref.current;
    const prevFocus = document.activeElement as HTMLElement | null;

    const focusable = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE));
    focusable[0]?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      prevFocus?.focus();
    };
  }, [open, ref, onClose]);
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  actions,
  children,
}: DialogProps) {
  const panelRef = React.useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, open, onClose);

  if (!open) return null;

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `color-mix(in srgb, var(--ds-color-scrim) 32%, transparent)`,
        }}
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ds-dialog-title"
        aria-describedby={description ? "ds-dialog-desc" : undefined}
        className={cn(
          "elevation-3 relative z-10 w-full max-w-sm rounded-ds-xl bg-ds-surface p-6",
          "flex flex-col gap-4",
        )}
      >
        <h2
          id="ds-dialog-title"
          className="text-headline-small text-ds-on-surface"
        >
          {title}
        </h2>
        {description && (
          <p
            id="ds-dialog-desc"
            className="text-body-medium text-ds-on-surface-variant"
          >
            {description}
          </p>
        )}
        {children && (
          <div className="text-body-medium text-ds-on-surface-variant">
            {children}
          </div>
        )}
        {actions && <div className="flex justify-end gap-2">{actions}</div>}
      </div>
    </div>
  );
}
