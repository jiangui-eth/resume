import { readFileSync } from "node:fs";
import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { render } from "@testing-library/react";

// ── Mock next-intl/server ──────────────────────────────────────────────────────

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

vi.mock("@/lib/analytics", () => ({ track: vi.fn() }));

import ProjectsPage, { generateMetadata } from "../page";
import zhCN from "../../../../../messages/zh-CN.json";

async function renderPage() {
  const jsx = await ProjectsPage();
  return render(
    <NextIntlClientProvider locale="zh-CN" messages={zhCN}>
      {jsx}
    </NextIntlClientProvider>
  );
}

describe("ProjectsPage", () => {
  it("renders the i18n projects heading (zh-CN: 架构)", async () => {
    await renderPage();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: /架构/i })
    ).toBeInTheDocument();
  });

  it("renders the i18n subtitle paragraph (zh-CN)", async () => {
    await renderPage();
    expect(screen.getByText(/技术领导力与前端工程实践/)).toBeInTheDocument();
  });

  it("generateMetadata returns a non-empty title", async () => {
    const metadata = await generateMetadata();
    expect(typeof metadata.title).toBe("string");
    expect(metadata.title).toBeTruthy();
  });

  it("generateMetadata returns a non-empty description", async () => {
    const metadata = await generateMetadata();
    expect(typeof metadata.description).toBe("string");
    expect(metadata.description).toBeTruthy();
  });

  it("does not use framer-motion or use client directive", () => {
    const source = readFileSync("src/app/[locale]/projects/page.tsx", "utf8");
    expect(source).not.toContain("framer-motion");
    expect(source).not.toContain('"use client"');
    expect(source).not.toContain("'use client'");
  });

  it("renders without crashing when mounted", async () => {
    const { container } = await renderPage();
    expect(container.firstChild).not.toBeNull();
  });
});
