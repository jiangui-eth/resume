"use client";

import React from "react";
import { Mail, MessageCircle, Phone, Eye, EyeOff } from "lucide-react";

import type { ContactInfo } from "@/types/contact";
import contactData from "@/data/contact.json";

const contact = contactData as ContactInfo;

// ── Types ──────────────────────────────────────────────────────────────────────

type CardVariant = "email" | "wechat" | "phone";

interface ContactCardConfig {
  variant: CardVariant;
  icon: React.ElementType;
  label: string;
  value: string;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const CARDS: ContactCardConfig[] = [
  { variant: "email", icon: Mail, label: "Email", value: contact.email },
  { variant: "wechat", icon: MessageCircle, label: "WeChat", value: contact.wechat },
  { variant: "phone", icon: Phone, label: "Phone", value: contact.phone },
];

const MASKED = "••••••••";
const FALLBACK = "Not configured";

// ── EmailCard ──────────────────────────────────────────────────────────────────

function EmailCard({ icon: Icon, label, value }: Omit<ContactCardConfig, "variant">) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05]">
      <div className="w-fit rounded-xl border border-white/10 bg-white/[0.05] p-3 text-blue-400">
        <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-widest text-white/30">{label}</span>
        <a
          href={`mailto:${value}`}
          className="text-sm font-medium text-white/80 transition-colors hover:text-white"
        >
          {value}
        </a>
      </div>
    </article>
  );
}

// ── RevealCard ─────────────────────────────────────────────────────────────────

function RevealCard({ icon: Icon, label, value }: Omit<ContactCardConfig, "variant">) {
  const [revealed, setRevealed] = React.useState(false);
  const display = revealed ? (value || FALLBACK) : MASKED;

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05]">
      <div className="flex items-start justify-between">
        <div className="w-fit rounded-xl border border-white/10 bg-white/[0.05] p-3 text-purple-400">
          <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
        </div>
        <button
          onClick={() => setRevealed((r) => !r)}
          className="flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/[0.03] px-3 py-1.5 text-xs text-white/40 transition-all duration-200 hover:border-white/15 hover:text-white/70"
          aria-label={revealed ? `Hide ${label}` : `Reveal ${label}`}
        >
          {revealed ? (
            <><EyeOff size={12} aria-hidden="true" /> Hide</>
          ) : (
            <><Eye size={12} aria-hidden="true" /> Reveal</>
          )}
        </button>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-widest text-white/30">{label}</span>
        <span
          className={`text-sm font-medium transition-all duration-200 ${
            revealed ? "text-white/80" : "tracking-widest text-white/20"
          }`}
        >
          {display}
        </span>
      </div>
    </article>
  );
}

// ── ContactSection ─────────────────────────────────────────────────────────────

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ background: "#0a0a0f" }}
      aria-label="Contact"
    >
      {/* Top separator */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(147,197,253,0.15), rgba(196,181,253,0.15), transparent)",
        }}
      />

      {/* Bottom glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(59,130,246,0.18) 0%, rgba(147,51,234,0.12) 50%, transparent 80%)",
        }}
      />

      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both mb-12 flex flex-col gap-3">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-300">
            Get in Touch
          </span>
          <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            Let&apos;s build the{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #93c5fd 0%, #c4b5fd 60%, #f9a8d4 100%)",
              }}
            >
              next generation
            </span>{" "}
            of web.
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-white/50">
            Open to full-time roles, freelance projects, and technical collaborations.
            Reach out through any channel below.
          </p>
        </div>

        {/* Cards */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both delay-150 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CARDS.map(({ variant, icon, label, value }) =>
            variant === "email" ? (
              <EmailCard key={variant} icon={icon} label={label} value={value} />
            ) : (
              <RevealCard key={variant} icon={icon} label={label} value={value} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
