import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SkillsHero from "../SkillsHero";

describe("SkillsHero", () => {
  it("renders the Chinese eyebrow label", () => {
    render(<SkillsHero />);
    expect(screen.getByText(/核心能力/i)).toBeInTheDocument();
  });

  it("renders the Chinese h1 heading", () => {
    render(<SkillsHero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/技术专长/i);
  });

  it("renders the 系统架构 badge", () => {
    render(<SkillsHero />);
    expect(screen.getByText(/系统架构/i)).toBeInTheDocument();
  });

  it("renders the 性能优先 badge", () => {
    render(<SkillsHero />);
    expect(screen.getByText(/性能优先/i)).toBeInTheDocument();
  });

  it("renders the updated Chinese description paragraph", () => {
    render(<SkillsHero />);
    expect(screen.getByText(/8 年前端开发经验/)).toBeInTheDocument();
  });
});
