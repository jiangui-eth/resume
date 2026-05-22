"use client";

import React from "react";
import { cn } from "@jiangui-resume/ui/lib/utils";
import type { ContactInfo } from "@/types/contact";
import contactData from "@/data/contact.json";
import SectionWrapper from "@/components/ui/SectionWrapper";

const contact = contactData as ContactInfo;

// ── Types ──────────────────────────────────────────────────────────────────────

interface ContactCardConfig {
  icon: string; // Material Symbols icon name
  label: string;
  value: string;
  href?: string;
  reveal?: boolean;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const CARDS: ContactCardConfig[] = [
  { icon: "mail", label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { icon: "chat", label: "WeChat", value: contact.wechat, reveal: true },
  { icon: "call", label: "Phone", value: contact.phone, reveal: true },
];

const MASKED = "••••••••";
const FALLBACK = "Not configured";

// ── ContactCard ────────────────────────────────────────────────────────────────

function ContactCard({ icon, label, value, href, reveal }: ContactCardConfig) {
  const [revealed, setRevealed] = React.useState(false);
  const display = reveal ? (revealed ? (value || FALLBACK) : MASKED) : (value || FALLBACK);

  return (
    <article className="glass-card p-6 flex items-center gap-4">
      {/* Icon circle */}
      <div className="w-12 h-12 bg-[#aec6ff]/10 rounded-full flex items-center justify-center text-[#aec6ff] shrink-0">
        <span className="material-symbols-outlined" aria-hidden="true">{icon}</span>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0 text-left">
        <p className="font-mono text-sm font-medium leading-[1.4] tracking-[0.02em] text-[#8e9192]">
          {label}
        </p>
        {href && !reveal ? (
          <a
            href={href}
            className="text-2xl font-semibold leading-[1.3] tracking-[-0.01em] text-[#e3e2e2] truncate block hover:text-[#aec6ff] transition-colors"
          >
            {display}
          </a>
        ) : (
          <p
            className={cn(
              "text-2xl font-semibold leading-[1.3] tracking-[-0.01em] truncate",
              reveal && !revealed ? "tracking-widest text-[#e3e2e2]/20" : "text-[#e3e2e2]",
            )}
          >
            {display}
          </p>
        )}
      </div>

      {/* Reveal toggle */}
      {reveal && (
        <button
          onClick={() => setRevealed((r) => !r)}
          className="shrink-0 flex items-center gap-1 rounded border border-[#444748]/40 bg-[rgba(255,255,255,0.03)] px-3 py-1.5 font-mono text-xs text-[#8e9192] hover:text-[#e3e2e2] transition-colors"
          aria-label={revealed ? `Hide ${label}` : `Reveal ${label}`}
        >
          <span className="material-symbols-outlined text-base" aria-hidden="true">
            {revealed ? "visibility_off" : "visibility"}
          </span>
          {revealed ? "Hide" : "Reveal"}
        </button>
      )}
    </article>
  );
}

// ── ContactSection ─────────────────────────────────────────────────────────────

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-[#1b1c1c] py-20"
      aria-label="Contact"
    >
      <SectionWrapper as="div" className="text-center">
        {/* Heading */}
        <h3 className="text-[32px] leading-[1.2] font-bold tracking-[-0.02em] text-[#e3e2e2] mb-4">
          期待合作，共建下一代 Web 产品。
        </h3>
        <p className="text-lg leading-[1.6] text-[#8e9192] max-w-xl mx-auto mb-10">
          正寻求高级前端 / AI 全栈岗位，支持远程与现场合作，欢迎联系。
        </p>

        {/* 3-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {CARDS.map((card) => (
            <ContactCard key={card.label} {...card} />
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
}
