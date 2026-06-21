"use client";

import type { Locale } from "@/i18n/routing";
import { cn } from "@jiangui-resume/ui/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";

const LOCALES: { value: Locale; labelKey: "en" | "zhCN" | "zhTW" }[] = [
  { value: "en", labelKey: "en" },
  { value: "zh-CN", labelKey: "zhCN" },
  { value: "zh-TW", labelKey: "zhTW" },
];

export default function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={t("label")}
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={isPending}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1 rounded px-2 py-2 text-sm font-medium transition-colors",
          "text-[#8e9192] hover:text-[#e3e2e2]",
          isPending && "cursor-not-allowed opacity-50",
        )}
      >
        <span
          className="material-symbols-outlined text-[20px]"
          aria-hidden="true"
        >
          language
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t("label")}
          className="absolute top-full right-0 z-50 mt-1 min-w-[130px] rounded-lg border border-[#444748]/40 bg-[#1b1c1c] py-1 shadow-xl"
        >
          {LOCALES.map(({ value, labelKey }) => (
            <li
              key={value}
              role="option"
              aria-selected={locale === value}
              onClick={() => handleSelect(value)}
              className={cn(
                "w-full cursor-pointer px-4 py-2 text-left text-sm transition-colors",
                locale === value
                  ? "bg-[#aec6ff]/5 font-semibold text-[#aec6ff]"
                  : "text-[#8e9192] hover:bg-white/5 hover:text-[#e3e2e2]",
              )}
            >
              {t(labelKey)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
