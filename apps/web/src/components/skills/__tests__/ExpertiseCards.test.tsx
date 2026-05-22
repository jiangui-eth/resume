import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ExpertiseCards from "../ExpertiseCards";

describe("ExpertiseCards", () => {
  it("renders the Chinese expertise section heading", () => {
    render(<ExpertiseCards />);
    expect(screen.getByRole("heading", { name: /实战经验沉淀/i })).toBeInTheDocument();
  });

  it("renders 3 expertise card titles", () => {
    render(<ExpertiseCards />);
    expect(screen.getByRole("heading", { name: /SSR\/ISR Strategies/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Micro-frontends/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Design System Arch/i })).toBeInTheDocument();
  });

  it("renders the updated first expertise description", () => {
    render(<ExpertiseCards />);
    expect(screen.getByText(/Core Web Vitals/)).toBeInTheDocument();
  });

  it("renders all 3 Material Symbols icon containers", () => {
    render(<ExpertiseCards />);
    const icons = document.querySelectorAll(".material-symbols-outlined");
    expect(icons.length).toBe(3);
  });

  it("renders description paragraphs for each card", () => {
    render(<ExpertiseCards />);
    const section = screen
      .getByRole("heading", { name: /实战经验沉淀/i })
      .closest("div");
    expect(section).not.toBeNull();
    const paragraphs = section!.querySelectorAll("p");
    expect(paragraphs.length).toBe(3);
  });
});
