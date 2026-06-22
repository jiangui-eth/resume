import type { JSX } from "react";

import type { ContactCardConfig } from "./ContactCard";
import type { ContactInfo } from "@/types/contact";
import { getTranslations } from "next-intl/server";
import SectionWrapper from "@/components/ui/SectionWrapper";
import contactData from "@/data/contact.json";
import ContactCard from "./ContactCard";

const contact = contactData as ContactInfo;

export default async function ContactSection(): Promise<JSX.Element> {
  const t = await getTranslations("contact");

  const tLabels = await getTranslations("contactLabels");

  const CARDS: ContactCardConfig[] = [
    {
      icon: "mail",
      label: tLabels("email"),
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: "chat",
      label: tLabels("wechat"),
      value: contact.wechat,
      reveal: true,
    },
    {
      icon: "call",
      label: tLabels("phone"),
      value: contact.phone,
      reveal: true,
    },
  ];

  return (
    <section id="contact" className="bg-[#1b1c1c] py-20" aria-label="Contact">
      <SectionWrapper as="div" className="text-center">
        {/* Heading */}
        <h3 className="mb-4 text-[32px] leading-[1.2] font-bold tracking-[-0.02em] text-[#e3e2e2]">
          {t("title")}
        </h3>
        <p className="mx-auto mb-10 max-w-xl text-lg leading-[1.6] text-[#8e9192]">
          {t("subtitle")}
        </p>

        {/* 3-card grid */}
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-3">
          {CARDS.map((card) => (
            <ContactCard key={card.label} {...card} />
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
}
