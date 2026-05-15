"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
] as { href: Route; label: string }[];

const RESUME_PDF_PATH = "/resume.pdf";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={[
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-[#121414]/80 backdrop-blur-md border-b border-[#444748]/20"
          : "bg-[#121414]/80 backdrop-blur-xl border-b border-[#444748]/20",
      ].join(" ")}
    >
      <nav className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          aria-label="DevArchitect"
          className="flex items-center gap-2"
        >
          <span className="text-2xl font-bold leading-[1.3] tracking-[-0.01em] text-[#e3e2e2]">
            DevArchitect
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "relative text-base font-normal leading-[1.6] transition-colors",
                    isActive
                      ? "text-[#e3e2e2] font-bold border-b-2 border-[#aec6ff] pb-1"
                      : "text-[#8e9192] hover:text-[#e3e2e2]",
                  ].join(" ")}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center mr-6">
          <DownloadPdfButton />
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden flex items-center justify-center rounded-md p-2 text-[#8e9192] hover:text-[#e3e2e2] transition-colors"
        >
          <span className="material-symbols-outlined text-2xl" aria-hidden="true">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        role="dialog"
        aria-label="navigation menu"
        aria-modal="false"
        className={[
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
          "bg-[#121414]/95 backdrop-blur-md border-b border-[#444748]/20",
        ].join(" ")}
      >
        <ul className="flex flex-col px-6 pb-6 pt-2 gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "flex items-center px-3 py-3 text-base font-medium rounded-md transition-colors",
                    isActive
                      ? "text-[#e3e2e2]"
                      : "text-[#8e9192] hover:text-[#e3e2e2]",
                  ].join(" ")}
                >
                  {label}
                </Link>
              </li>
            );
          })}
          <li className="pt-2">
            <DownloadPdfButton fullWidth />
          </li>
        </ul>
      </div>
    </header>
  );
}

function DownloadPdfButton({ fullWidth = false }: { fullWidth?: boolean }) {
  const [pdfExists, setPdfExists] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(RESUME_PDF_PATH, { method: "HEAD" })
      .then((r) => setPdfExists(r.ok))
      .catch(() => setPdfExists(false));
  }, []);

  if (pdfExists === false) {
    return (
      <span
        title="PDF not available yet — check back soon"
        className={[
          "inline-flex items-center gap-2 rounded px-4 py-2 font-['JetBrains_Mono'] text-sm font-medium",
          "bg-[#508eff]/40 text-[#aec6ff]/60 cursor-not-allowed select-none",
          fullWidth ? "w-full justify-center" : "",
        ].join(" ")}
      >
        Download PDF
      </span>
    );
  }

  return (
    <a
      href={RESUME_PDF_PATH}
      download
      onClick={() => track("click_download_pdf", {})}
      className={[
        "inline-flex items-center gap-2 rounded px-4 py-2 font-['JetBrains_Mono'] text-sm font-medium",
        "bg-[#508eff] text-[#00275e] hover:brightness-110 transition-all",
        fullWidth ? "w-full justify-center" : "",
      ].join(" ")}
    >
      Download PDF
    </a>
  );
}
