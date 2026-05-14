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

    expect(screen.getByText("Gate.io")).toBeInTheDocument();
    expect(screen.getByText("Envision Energy")).toBeInTheDocument();
    expect(screen.getByText("Chaos (Internal Platform)")).toBeInTheDocument();
  });

  it("renders the present entry highlight", () => {
    render(<Timeline />);

    expect(screen.getByText("Present")).toBeInTheDocument();
  });

  it("formats the period start date", () => {
    render(<Timeline />);

    expect(screen.getByText(/Jun 2022/)).toBeInTheDocument();
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
});
