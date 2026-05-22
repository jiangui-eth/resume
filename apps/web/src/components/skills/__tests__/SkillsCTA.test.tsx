import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SkillsCTA from "../SkillsCTA";

describe("SkillsCTA", () => {
  it("renders the Chinese CTA heading", () => {
    render(<SkillsCTA />);
    expect(
      screen.getByRole("heading", { name: /期待下一个架构挑战/i })
    ).toBeInTheDocument();
  });

  it("renders the Chinese contact link", () => {
    render(<SkillsCTA />);
    const link = screen.getByRole("link", { name: /联系我/i });
    expect(link).toBeInTheDocument();
  });

  it("keeps the contact link target unchanged", () => {
    render(<SkillsCTA />);
    const link = screen.getByRole("link", { name: /联系我/i });
    expect(link).toHaveAttribute("href", "mailto:jiangui.eth@gmail.com");
  });

  it("renders a supporting paragraph below the Chinese heading", () => {
    render(<SkillsCTA />);
    const section = screen.getByRole("heading", { name: /期待下一个架构挑战/i }).closest("div");
    expect(section!.querySelector("p")).not.toBeNull();
  });
});
