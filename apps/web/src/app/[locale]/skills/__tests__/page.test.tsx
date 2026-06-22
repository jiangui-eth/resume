import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import zhCN from "../../../../../messages/zh-CN.json";
import SkillsPage, { generateMetadata } from "../page";

vi.mock("next-intl/server", async () => {
  const { default: msgs } = await import("../../../../../messages/zh-CN.json");
  return {
    getLocale: vi.fn().mockResolvedValue("zh-CN"),
    getMessages: vi.fn().mockResolvedValue(msgs),
  };
});

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

async function renderPage() {
  const jsx = await SkillsPage();
  return render(
    <NextIntlClientProvider locale="zh-CN" messages={zhCN}>
      {jsx}
    </NextIntlClientProvider>,
  );
}

describe("skillsPage", () => {
  it("renders the Chinese skills heading", async () => {
    await renderPage();
    expect(
      screen.getByRole("heading", { name: /技术专长/ }),
    ).toBeInTheDocument();
  });

  it("renders the updated Chinese intro paragraph", async () => {
    await renderPage();
    expect(screen.getByText(/React \/ Next\.js/)).toBeInTheDocument();
  });

  it("generateMetadata returns a non-empty title", async () => {
    const meta = await generateMetadata();
    expect(typeof meta.title).toBe("string");
    expect((meta.title as string).length).toBeGreaterThan(0);
  });

  it("generateMetadata returns a non-empty description", async () => {
    const meta = await generateMetadata();
    expect(typeof meta.description).toBe("string");
    expect((meta.description as string).length).toBeGreaterThan(0);
  });

  it("renders without crashing", async () => {
    await expect(renderPage()).resolves.not.toThrow();
  });

  it("renders the Chinese core competencies badge", async () => {
    await renderPage();
    expect(screen.getByText("核心能力")).toBeInTheDocument();
  });
});
