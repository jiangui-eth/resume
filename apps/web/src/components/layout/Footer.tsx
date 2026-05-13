import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

import contactData from "@/data/contact.json";

const CURRENT_YEAR = new Date().getFullYear();

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: contactData.github,
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: contactData.linkedin,
    icon: Linkedin,
  },
  {
    label: "Twitter",
    href: contactData.twitter,
    icon: Twitter,
  },
  {
    label: "Email",
    href: `mailto:${contactData.email}`,
    icon: Mail,
  },
].filter((l) => l.href && l.href !== "mailto:");

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Main row */}
        <div className="flex flex-col items-center gap-6 py-10 sm:flex-row sm:justify-between">
          {/* Left — brand + tagline */}
          <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
            <Link
              href="/"
              className="text-base font-bold tracking-tight font-mono text-foreground hover:text-foreground/80 transition-colors"
            >
              jiangui<span className="text-primary/70">.eth</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Building high-performance web applications and Web3 experiences.
            </p>
          </div>

          {/* Right — social icons */}
          <nav aria-label="Social links">
            <ul className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <Icon size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Copyright bar */}
        <div className="border-t border-border/40 py-4 text-center">
          <p className="text-xs text-muted-foreground">
            © {CURRENT_YEAR} jiangui.eth — Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
