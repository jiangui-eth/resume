import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { render } from "@testing-library/react";
import React from "react";

// ── Mock next-intl/server so async page can call getTranslations ───────────────

vi.mock("next-intl/server", async () => {
  const zhCN = (await import("../../../../../messages/zh-CN.json")).default;
  function makeT(namespace?: string) {
    return (key: string) => {
      const section = namespace
        ? (zhCN as Record<string, Record<string, string>>)[namespace]
        : (zhCN as Record<string, string>);
      if (!section) return key;
      const parts = key.split(".");
      let val: unknown = section;
      for (const p of parts) val = (val as Record<string, unknown>)?.[p];
      return (val as string) ?? key;
    };
  }
  return {
    getTranslations: vi.fn().mockImplementation(async (ns?: string) => makeT(ns)),
    getLocale: vi.fn().mockResolvedValue("zh-CN"),
    getMessages: vi.fn().mockResolvedValue(zhCN),
  };
});

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) =>
      React.createElement("div", props, children),
  },
  useInView: () => true,
}));

import ExperiencePage, { generateMetadata } from "../page";
import zhCN from "../../../../../messages/zh-CN.json";

async function renderPage() {
  const jsx = await ExperiencePage();
  return render(
    <NextIntlClientProvider locale="zh-CN" messages={zhCN}>
      {jsx}
    </NextIntlClientProvider>
  );
}

describe("ExperiencePage", () => {
  it("renders the i18n experience heading (zh-CN)", async () => {
    await renderPage();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText("经历")).toBeInTheDocument();
  });

  it("renders the i18n badge label (zh-CN: 职业历程)", async () => {
    await renderPage();
    expect(screen.getByText("职业历程")).toBeInTheDocument();
  });

  it("renders the i18n summary paragraph (zh-CN)", async () => {
    await renderPage();
    expect(screen.getByText(/8 年前端开发经验/)).toBeInTheDocument();
  });

  it("renders the timeline placeholder div", async () => {
    await renderPage();
    expect(document.getElementById("timeline-placeholder")).toBeInTheDocument();
  });

  it("generateMetadata returns correct title", async () => {
    const meta = await generateMetadata();
    expect(meta.title).toBe("Experience | jiangui.eth");
  });

  it("generateMetadata returns a non-empty description", async () => {
    const meta = await generateMetadata();
    expect(typeof meta.description).toBe("string");
    expect(meta.description).toBeTruthy();
  });
});
