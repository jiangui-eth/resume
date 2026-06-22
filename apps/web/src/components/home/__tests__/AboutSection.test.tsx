import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import zhCN from "../../../../messages/zh-CN.json";

import AboutSection from "../AboutSection";

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

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) => <img src={src} alt={alt} {...props} />,
}));

async function renderSection() {
  const jsx = await AboutSection();
  return render(
    <NextIntlClientProvider locale="zh-CN" messages={zhCN}>
      {jsx}
    </NextIntlClientProvider>,
  );
}

describe("aboutSection", () => {
  it("renders the i18n title (zh-CN)", async () => {
    await renderSection();
    expect(screen.getByText("深耕工程，精益求精")).toBeInTheDocument();
  });

  it("renders the i18n bio summary (zh-CN)", async () => {
    await renderSection();
    expect(screen.getByText(/8 年前端开发经验/)).toBeInTheDocument();
  });

  it("renders all three quantified stats", async () => {
    await renderSection();
    expect(screen.getByText("14x")).toBeInTheDocument();
    expect(screen.getByText("1.8s")).toBeInTheDocument();
    expect(screen.getByText("80%")).toBeInTheDocument();
  });

  it("renders stat labels", async () => {
    await renderSection();
    expect(screen.getByText("SEO Growth")).toBeInTheDocument();
    expect(screen.getByText("LCP Optimized")).toBeInTheDocument();
    expect(screen.getByText("Build Speedup")).toBeInTheDocument();
  });

  it("renders the avatar image with grayscale class", async () => {
    await renderSection();
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute(
      "src",
      expect.stringContaining("/images/avatar/jiangui.eth.jpg"),
    );
    expect(img).toHaveAttribute("alt", expect.stringContaining("JianGui"));
    expect(img.className).toContain("grayscale");
  });

  it("has accessible section landmark", async () => {
    await renderSection();
    expect(screen.getByRole("region", { name: /about/i })).toBeInTheDocument();
  });
});
