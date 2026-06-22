"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const VALID_THEMES = ["light", "dark", "system"] as const;
type ValidTheme = (typeof VALID_THEMES)[number];

function resolveTheme(theme: string | undefined): ValidTheme {
  return VALID_THEMES.includes(theme as ValidTheme)
    ? (theme as ValidTheme)
    : "system";
}

const toasterStyles: React.CSSProperties = {
  ["--normal-bg" as string]: "var(--popover)",
  ["--normal-text" as string]: "var(--popover-foreground)",
  ["--normal-border" as string]: "var(--border)",
  ["--border-radius" as string]: "var(--radius)",
};

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={resolveTheme(theme)}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={toasterStyles}
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
