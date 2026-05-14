import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// ── Lucide mock ────────────────────────────────────────────────────────────────

vi.mock("lucide-react", () => ({
  Layers2: ({ "aria-hidden": hidden }: { "aria-hidden"?: string }) => (
    <svg data-testid="icon-layers2" aria-hidden={hidden} />
  ),
  Zap: ({ "aria-hidden": hidden }: { "aria-hidden"?: string }) => (
    <svg data-testid="icon-zap" aria-hidden={hidden} />
  ),
  Brain: ({ "aria-hidden": hidden }: { "aria-hidden"?: string }) => (
    <svg data-testid="icon-brain" aria-hidden={hidden} />
  ),
  Wrench: ({ "aria-hidden": hidden }: { "aria-hidden"?: string }) => (
    <svg data-testid="icon-wrench" aria-hidden={hidden} />
  ),
}));

import CapabilitySection from "../CapabilitySection";

// ── Tests ──────────────────────────────────────────────────────────────────────

describe("CapabilitySection", () => {
  it("renders the section label and heading", () => {
    render(<CapabilitySection />);
    expect(screen.getByText("Technical Arsenal")).toBeInTheDocument();
    expect(screen.getByText(/built to ship/i)).toBeInTheDocument();
  });

  it("renders all four capability card titles", () => {
    render(<CapabilitySection />);
    expect(screen.getByText("Next.js / React")).toBeInTheDocument();
    expect(screen.getByText("Performance")).toBeInTheDocument();
    expect(screen.getByText("AI & RAG")).toBeInTheDocument();
    expect(screen.getByText("Engineering")).toBeInTheDocument();
  });

  it("renders all four icons", () => {
    render(<CapabilitySection />);
    expect(screen.getByTestId("icon-layers2")).toBeInTheDocument();
    expect(screen.getByTestId("icon-zap")).toBeInTheDocument();
    expect(screen.getByTestId("icon-brain")).toBeInTheDocument();
    expect(screen.getByTestId("icon-wrench")).toBeInTheDocument();
  });

  it("renders bullet points for each card", () => {
    render(<CapabilitySection />);
    expect(screen.getByText(/App Router/i)).toBeInTheDocument();
    expect(screen.getByText(/Core Web Vitals/i)).toBeInTheDocument();
    expect(screen.getByText(/LLM API integration/i)).toBeInTheDocument();
    expect(screen.getByText(/TypeScript across the full stack/i)).toBeInTheDocument();
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
