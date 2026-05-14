import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SkillsCTA from "../SkillsCTA";

describe("SkillsCTA", () => {
  it("renders the main heading", () => {
    render(<SkillsCTA />);
    expect(
      screen.getByRole("heading", { name: /ready for the next architectural challenge/i })
    ).toBeInTheDocument();
  });

  it("renders a Get in Touch link", () => {
    render(<SkillsCTA />);
    const link = screen.getByRole("link", { name: /get in touch/i });
    expect(link).toBeInTheDocument();
  });

  it("Get in Touch link points to mailto", () => {
    render(<SkillsCTA />);
    const link = screen.getByRole("link", { name: /get in touch/i });
    expect(link).toHaveAttribute("href", "mailto:jiangui.eth@gmail.com");
  });

  it("renders a supporting paragraph", () => {
    render(<SkillsCTA />);
    const section = screen.getByRole("heading", { name: /ready for the next architectural challenge/i }).closest("div");
    expect(section!.querySelector("p")).not.toBeNull();
  });
});
