import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SkillsHero from "../SkillsHero";

describe("SkillsHero", () => {
  it("renders the 'Core Competencies' eyebrow label", () => {
    render(<SkillsHero />);
    expect(screen.getByText(/core competencies/i)).toBeInTheDocument();
  });

  it("renders the h1 heading with 'Technical Proficiency'", () => {
    render(<SkillsHero />);
    expect(
      screen.getByRole("heading", { level: 1 }),
    ).toHaveTextContent(/technical proficiency/i);
  });

  it("renders the Systems Architecture badge", () => {
    render(<SkillsHero />);
    expect(screen.getByText(/systems architecture/i)).toBeInTheDocument();
  });

  it("renders the Performance First badge", () => {
    render(<SkillsHero />);
    expect(screen.getByText(/performance first/i)).toBeInTheDocument();
  });

  it("renders the description paragraph", () => {
    render(<SkillsHero />);
    expect(
      screen.getByText(/senior frontend engineer/i),
    ).toBeInTheDocument();
  });
});
