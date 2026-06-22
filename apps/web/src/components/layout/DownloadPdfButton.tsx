"use client";

import type { JSX } from "react";

import { cn } from "@jiangui-resume/ui/lib/utils";
import { useTranslations } from "next-intl";
import { track } from "@/lib/analytics";

interface DownloadPdfButtonProps {
  fullWidth?: boolean;
}

export default function DownloadPdfButton({
  fullWidth = false,
}: DownloadPdfButtonProps): JSX.Element {
  const t = useTranslations("nav");

  return (
    <a
      href="/resume-preview"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("click_download_pdf", {})}
      className={cn(
        "inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-bold",
        "bg-[#508eff] text-[#00275e] transition-all hover:brightness-110",
        fullWidth && "w-full justify-center",
      )}
    >
      {t("downloadPdf")}
    </a>
  );
}
