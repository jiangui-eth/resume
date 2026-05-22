import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TechStackCards from "../TechStackCards";

describe("TechStackCards", () => {
  it("renders the Chinese tech stack heading", () => {
    render(<TechStackCards />);
    expect(screen.getByRole("heading", { name: /技术栈/i })).toBeInTheDocument();
  });

  it("renders at least one category heading", () => {
    render(<TechStackCards />);
    // category headings are h3 elements with uppercase tracking-widest styling
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings.length).toBeGreaterThan(0);
  });

  it("renders technology pill tags", () => {
    render(<TechStackCards />);
    // pills are spans — check there are multiple visible tech names
    const container = screen.getByRole("heading", { name: /技术栈/i }).parentElement;
    expect(container).not.toBeNull();
    const spans = container!.querySelectorAll("span");
    expect(spans.length).toBeGreaterThan(0);
  });

  it("renders 4 category columns", () => {
    render(<TechStackCards />);
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings.length).toBe(4);
  });
});
