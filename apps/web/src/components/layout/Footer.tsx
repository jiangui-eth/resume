"use client";

import { useTranslations } from "next-intl";
import contactData from "@/data/contact.json";

const CURRENT_YEAR = new Date().getFullYear();

const SOCIAL_LINKS = [
  { label: "GitHub", href: contactData.github },
  { label: "LinkedIn", href: contactData.linkedin },
  { label: "Twitter", href: contactData.twitter },
  { label: "Email", href: `mailto:${contactData.email}` },
].filter((l) => l.href && l.href !== "mailto:");

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-ds-border-2/20 bg-ds-bg flex w-full flex-col items-center justify-between gap-4 border-t px-6 py-10 md:flex-row">
      {/* Left — brand + copyright */}
      <div className="flex flex-col items-center gap-1 md:items-start">
        <span className="text-ds-fg text-2xl leading-[1.3] font-bold tracking-[-0.01em]">
          DevArchitect
        </span>
        <p className="text-ds-muted font-mono text-sm leading-[1.4] font-medium tracking-[0.02em]">
          © {CURRENT_YEAR} {t("copyright")}
        </p>
      </div>

      {/* Right — social links */}
      <nav aria-label="Social links">
        <ul className="flex items-center gap-10">
          {SOCIAL_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="text-ds-muted hover:text-ds-accent font-mono text-sm leading-[1.4] font-medium tracking-[0.02em] transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
