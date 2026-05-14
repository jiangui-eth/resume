"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, FileDown } from "lucide-react";

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

  // Scroll listener — toggle frosted glass
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/60 shadow-sm"
          : "bg-transparent",
      ].join(" ")}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground hover:text-foreground/80 transition-colors"
        >
          <span className="text-lg font-bold tracking-tight font-mono">
            jiangui<span className="text-primary/70">.eth</span>
          </span>
        </Link>

        {/* Desktop nav links — centered */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    "relative px-3 py-2 text-sm font-medium transition-colors rounded-md",
                    "hover:text-foreground hover:bg-accent",
                    isActive
                      ? "text-foreground after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-foreground after:content-['']"
                      : "text-muted-foreground",
                  ].join(" ")}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop right: Download PDF CTA */}
        <div className="hidden md:flex items-center">
          <DownloadPdfButton />
        </div>

        {/* Mobile: hamburger */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer — slide down */}
      <div
        className={[
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
          "bg-background/95 backdrop-blur-md border-b border-border/60",
        ].join(" ")}
      >
        <ul className="flex flex-col px-4 pb-6 pt-2 gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    "flex items-center px-3 py-3 text-base font-medium rounded-md transition-colors",
                    "hover:text-foreground hover:bg-accent",
                    isActive
                      ? "text-foreground bg-accent"
                      : "text-muted-foreground",
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

/* ── Download PDF button ───────────────────────── */

function DownloadPdfButton({ fullWidth = false }: { fullWidth?: boolean }) {
  const [pdfExists, setPdfExists] = useState<boolean | null>(null);

  useEffect(() => {
    // Lightweight HEAD check — if the file isn't there we show a tooltip
    fetch(RESUME_PDF_PATH, { method: "HEAD" })
      .then((r) => setPdfExists(r.ok))
      .catch(() => setPdfExists(false));
  }, []);

  if (pdfExists === false) {
    return (
      <span
        title="PDF not available yet — check back soon"
        className={[
          "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium",
          "bg-blue-600/40 text-blue-300/60 cursor-not-allowed select-none",
          fullWidth ? "w-full justify-center" : "",
        ].join(" ")}
      >
        <FileDown size={15} />
        Download PDF
      </span>
    );
  }

  return (
    <a
      href={RESUME_PDF_PATH}
      download
      className={[
        "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold",
        "bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700",
        "transition-colors duration-150 shadow-sm",
        fullWidth ? "w-full justify-center" : "",
      ].join(" ")}
    >
      <FileDown size={15} />
      Download PDF
    </a>
  );
}
