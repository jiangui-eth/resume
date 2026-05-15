import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import TechTag from "../TechTag";
import Timeline from "../Timeline";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) =>
      React.createElement("div", props, children),
  },
  useInView: () => true,
}));

describe("Timeline", () => {
  it("renders all 3 experience entries", () => {
    render(<Timeline />);
    // V2 renders each company in both the desktop side panel and mobile card header
    expect(screen.getAllByText("Gate.io").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Envision Energy").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Chaos (Internal Platform)").length).toBeGreaterThanOrEqual(1);
  });

  it("renders the present entry highlight", () => {
    render(<Timeline />);
    expect(screen.getAllByText("Present").length).toBeGreaterThanOrEqual(1);
  });

  it("formats the period start date", () => {
    render(<Timeline />);
    expect(screen.getAllByText(/Jun 2022/).length).toBeGreaterThanOrEqual(1);
  });

  it("renders responsibility bullets", () => {
    render(<Timeline />);
    expect(screen.getByText(/Led frontend architecture/i)).toBeInTheDocument();
  });

  it("renders tech tags", () => {
    render(<Timeline />);
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("renders the highlight metric", () => {
    render(<Timeline />);
    expect(screen.getByText("LCP 4.2s → 1.8s")).toBeInTheDocument();
  });

  it("renders the company link correctly", () => {
    render(<Timeline />);
    expect(screen.getByRole("link", { name: "Gate.io" })).toHaveAttribute(
      "href",
      "https://gate.io",
    );
  });
});

describe("TechTag", () => {
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
