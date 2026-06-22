import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import zhCN from "../../../../messages/zh-CN.json";

import CapabilitySection from "../CapabilitySection";

vi.mock("next-intl/server", async () => {
  const { default: msgs } = await import("../../../../messages/zh-CN.json");
  function makeT(ns?: string) {
    return (key: string) => {
      const section = ns
        ? (msgs as unknown as Record<string, Record<string, string>>)[ns]
        : (msgs as unknown as Record<string, string>);
      if (!section) return key;
      const parts = key.split(".");
      let val: unknown = section;
      for (const p of parts) val = (val as Record<string, unknown>)?.[p];
      return (val as string) ?? key;
    };
  }
  return {
    getTranslations: vi
      .fn()
      .mockImplementation(async (ns?: string) => makeT(ns)),
    getLocale: vi.fn().mockResolvedValue("zh-CN"),
    getMessages: vi.fn().mockResolvedValue(msgs),
  };
});

async function renderSection() {
  const jsx = await CapabilitySection();
  return render(
    <NextIntlClientProvider locale="zh-CN" messages={zhCN}>
      {jsx}
    </NextIntlClientProvider>,
  );
}

describe("capabilitySection", () => {
  it("renders the 专业技能 badge (zh-CN)", async () => {
    await renderSection();
    expect(screen.getByText("专业技能")).toBeInTheDocument();
  });

  it("renders the 核心技术栈 section heading (zh-CN)", async () => {
    await renderSection();
    expect(screen.getByText("核心技术栈")).toBeInTheDocument();
  });

  it("renders all four capability card titles", async () => {
    await renderSection();
    expect(screen.getByText("Next.js / React")).toBeInTheDocument();
    expect(screen.getByText("Performance")).toBeInTheDocument();
    expect(screen.getByText("AI & RAG")).toBeInTheDocument();
    expect(screen.getByText("Engineering")).toBeInTheDocument();
  });

  it("renders Material Symbols icon spans for each card", async () => {
    await renderSection();
    const icons = document.querySelectorAll(".material-symbols-outlined");
    expect(icons.length).toBeGreaterThanOrEqual(4);
  });

  it("renders bullet points for each card", async () => {
    await renderSection();
    expect(screen.getByText(/SSR & ISR Architectures/i)).toBeInTheDocument();
    expect(screen.getByText(/Core Web Vitals/i)).toBeInTheDocument();
    expect(screen.getByText(/LLM Orchestration/i)).toBeInTheDocument();
    expect(screen.getByText(/Monorepos/i)).toBeInTheDocument();
  });

  it("renders four article elements (one per card)", async () => {
    await renderSection();
    expect(screen.getAllByRole("article")).toHaveLength(4);
  });

  it("has accessible section landmark with i18n label (zh-CN)", async () => {
    await renderSection();
    expect(
      screen.getByRole("region", { name: /核心技术栈/ }),
    ).toBeInTheDocument();
  });
});
