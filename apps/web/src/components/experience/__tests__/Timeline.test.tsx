import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import TechTag from "@/components/ui/TechTag";
import { renderWithIntl } from "@/test/intl-test-utils";
import Timeline from "../Timeline";

describe("timeline", () => {
  it("renders all 5 experience entries", () => {
    renderWithIntl(<Timeline />);
    expect(
      screen.getAllByText(/Jingcheng Yideng/i).length,
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Gate.com").length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText(/Hanzhu Technology/i).length,
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/CIFS/i).length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText(/Guizhou Guoxintong/i).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("renders the present entry with i18n 'present' label (zh-CN: 至今)", () => {
    renderWithIntl(<Timeline />);
    expect(screen.getAllByText("至今").length).toBeGreaterThanOrEqual(1);
  });

  it("formats the period start date for Gate.com (zh-CN locale)", () => {
    renderWithIntl(<Timeline />);
    expect(screen.getAllByText(/2024年3月/).length).toBeGreaterThanOrEqual(1);
  });

  it("renders responsibility bullets", () => {
    renderWithIntl(<Timeline />);
    expect(
      screen.getByText(/Led full-stack AI development/i),
    ).toBeInTheDocument();
  });

  it("renders tech tags", () => {
    renderWithIntl(<Timeline />);
    expect(screen.getAllByText("Next.js").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("TypeScript").length).toBeGreaterThanOrEqual(1);
  });

  it("renders the Gate.com SEO highlight metric", () => {
    renderWithIntl(<Timeline />);
    expect(screen.getByText(/SEO 1K → 14K/i)).toBeInTheDocument();
  });

  it("renders the Gate.com company link correctly", () => {
    renderWithIntl(<Timeline />);
    expect(screen.getByRole("link", { name: "Gate.com" })).toHaveAttribute(
      "href",
      "https://gate.com",
    );
  });
});

describe("techTag", () => {
  it("renders the label", () => {
    render(<TechTag label="React" />);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("applies bg-white/5 and text-[#aec6ff] classes", () => {
    render(<TechTag label="Go" />);
    const tag = screen.getByText("Go");
    expect(tag.className).toContain("bg-white/5");
    expect(tag.className).toContain("text-[#aec6ff]");
  });
});
