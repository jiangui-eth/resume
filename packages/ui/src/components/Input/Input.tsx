"use client";

import { cn } from "@jiangui-resume/ui/lib/utils";
import * as React from "react";

export interface InputProps {
  variant?: "filled" | "outlined";
  label: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  errorText?: string;
  helperText?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  onChange?: (value: string) => void;
  id?: string;
}

export function Input({
  variant = "outlined",
  label,
  value,
  placeholder,
  disabled,
  error,
  errorText,
  helperText,
  leadingIcon,
  trailingIcon,
  onChange,
  id: idProp,
}: InputProps) {
  const generatedId = React.useId();
  const id = idProp ?? generatedId;
  const [focused, setFocused] = React.useState(false);

  const floatLabel = focused || Boolean(value) || Boolean(placeholder);

  const supportText = error ? errorText : helperText;
  const supportColor = error ? "text-ds-error" : "text-ds-on-surface-variant";

  return (
    <div className="relative w-full">
      <div
        className={cn(
          "relative flex items-center",
          variant === "filled" &&
            "rounded-t-ds-xs bg-ds-surface-variant px-4 pt-6 pb-2",
          variant === "outlined" && "rounded-ds-xs border px-4 pt-4 pb-2",
          variant === "outlined" && !error && !focused && "border-ds-outline",
          variant === "outlined" && focused && "border-2 border-ds-primary",
          variant === "outlined" && error && "border-2 border-ds-error",
          disabled && "opacity-[var(--ds-state-disabled-container)]",
        )}
      >
        {variant === "filled" && (
          <div
            className={cn(
              "absolute right-0 bottom-0 left-0 h-px",
              !error && !focused && "bg-ds-on-surface-variant",
              focused && !error && "h-[2px] bg-ds-primary",
              error && "h-[2px] bg-ds-error",
            )}
          />
        )}

        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-4 transition-all duration-[var(--ds-duration-short-3)]",
            floatLabel
              ? "top-1 text-body-small text-ds-on-surface-variant"
              : "top-1/2 -translate-y-1/2 text-body-large text-ds-on-surface-variant",
            focused && !error && "text-ds-primary",
            error && "text-ds-error",
          )}
        >
          {label}
        </label>

        {leadingIcon && (
          <span className="mr-3 text-ds-on-surface-variant">{leadingIcon}</span>
        )}

        <input
          id={id}
          value={value}
          placeholder={focused ? placeholder : undefined}
          disabled={disabled}
          aria-invalid={error || undefined}
          aria-describedby={supportText ? `${id}-support` : undefined}
          className="w-full bg-transparent text-body-large text-ds-on-surface outline-none placeholder:text-ds-on-surface-variant/60"
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        {trailingIcon && (
          <span className="ml-3 text-ds-on-surface-variant">
            {trailingIcon}
          </span>
        )}
      </div>

      {supportText && (
        <p
          id={`${id}-support`}
          className={cn("mt-1 px-4 text-body-small", supportColor)}
        >
          {supportText}
        </p>
      )}
    </div>
  );
}
