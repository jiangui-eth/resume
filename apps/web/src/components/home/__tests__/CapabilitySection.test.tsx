import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import CapabilitySection from "../CapabilitySection";

describe("CapabilitySection", () => {
  it("renders the EXPERTISE badge", () => {
    render(<CapabilitySection />);
    expect(screen.getByText("Expertise")).toBeInTheDocument();
  });

  it("renders the section heading", () => {
    render(<CapabilitySection />);
    expect(screen.getByText("Technical Arsenal")).toBeInTheDocument();
  });

  it("renders all four capability card titles", () => {
    render(<CapabilitySection />);
    expect(screen.getByText("Next.js / React")).toBeInTheDocument();
    expect(screen.getByText("Performance")).toBeInTheDocument();
    expect(screen.getByText("AI & RAG")).toBeInTheDocument();
    expect(screen.getByText("Engineering")).toBeInTheDocument();
  });

  it("renders Material Symbols icon spans for each card", () => {
    render(<CapabilitySection />);
    const icons = document.querySelectorAll(".material-symbols-outlined");
    expect(icons.length).toBeGreaterThanOrEqual(4);
  });

  it("renders bullet points for each card", () => {
    render(<CapabilitySection />);
    expect(screen.getByText(/SSR & ISR Architectures/i)).toBeInTheDocument();
    expect(screen.getByText(/Core Web Vitals/i)).toBeInTheDocument();
    expect(screen.getByText(/LLM Orchestration/i)).toBeInTheDocument();
    expect(screen.getByText(/Monorepos/i)).toBeInTheDocument();
  });

  it("renders four article elements (one per card)", () => {
    render(<CapabilitySection />);
    expect(screen.getAllByRole("article")).toHaveLength(4);
  });

  it("has accessible section landmark", () => {
    render(<CapabilitySection />);
    expect(screen.getByRole("region", { name: /technical arsenal/i })).toBeInTheDocument();
  });
});
