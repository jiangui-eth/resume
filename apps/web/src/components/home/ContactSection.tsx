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
    <section id="contact" className="bg-ds-surface py-20" aria-label="Contact">
      <SectionWrapper as="div" className="text-center">
        {/* Heading */}
        <h3
          className="mb-4 text-headline-large"
          style={{ color: "var(--ds-fg)" }}
        >
          {t("title")}
        </h3>
        <p className="text-ds-muted mx-auto mb-10 max-w-xl text-lg leading-[1.6]">
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
