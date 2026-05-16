"use client";

import Link from "next/link";
import type { Route } from "next";
import { track } from "@/lib/analytics";
import { useNavbar } from "@/hooks/useNavbar";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
] as { href: Route; label: string }[];


export default function Navbar() {
  const { scrolled, mobileOpen, setMobileOpen, pathname } = useNavbar();

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

        {/* Desktop CTA — hidden on resume-preview (page has its own print toolbar) */}
          <div className="hidden md:flex items-center mr-6">
            {pathname !== "/resume-preview" && (
                <DownloadPdfButton />
            )}
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
          {pathname !== "/resume-preview" && (
            <li className="pt-2">
                <DownloadPdfButton fullWidth />
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}

function DownloadPdfButton({ fullWidth = false }: { fullWidth?: boolean }) {
  return (
    <a
      href="/resume-preview"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("click_download_pdf", {})}
      className={[
        "inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-bold",
        "bg-[#508eff] text-[#00275e] hover:brightness-110 transition-all",
        fullWidth ? "w-full justify-center" : "",
      ].join(" ")}
    >
      Download PDF
    </a>
  );
}
