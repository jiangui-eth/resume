import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ExpertiseCards from "../ExpertiseCards";

describe("ExpertiseCards", () => {
  it("renders the Battle-Tested Expertise heading", () => {
    render(<ExpertiseCards />);
    expect(
      screen.getByRole("heading", { name: /battle-tested expertise/i })
    ).toBeInTheDocument();
  });

  it("renders 3 expertise card titles", () => {
    render(<ExpertiseCards />);
    expect(screen.getByRole("heading", { name: /SSR\/ISR Strategies/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Micro-frontends/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Design System Arch/i })).toBeInTheDocument();
  });

  it("renders description text for the first card (mentions TTI)", () => {
    render(<ExpertiseCards />);
    expect(screen.getByText(/TTI by 40%/i)).toBeInTheDocument();
  });

  it("renders all 3 Material Symbols icon containers", () => {
    render(<ExpertiseCards />);
    const icons = document.querySelectorAll(".material-symbols-outlined");
    expect(icons.length).toBe(3);
  });

  it("renders description paragraphs for each card", () => {
    render(<ExpertiseCards />);
    const section = screen
      .getByRole("heading", { name: /battle-tested expertise/i })
      .closest("div");
    expect(section).not.toBeNull();
    const paragraphs = section!.querySelectorAll("p");
    expect(paragraphs.length).toBe(3);
  });
});
