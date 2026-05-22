import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { renderWithIntl } from "@/test/intl-test-utils";
import SkillsHero from "../SkillsHero";

describe("SkillsHero", () => {
  it("renders the i18n eyebrow label (zh-CN: 核心能力)", () => {
    renderWithIntl(<SkillsHero />);
    expect(screen.getByText(/核心能力/i)).toBeInTheDocument();
  });

  it("renders the i18n h1 heading (zh-CN: 技术专长)", () => {
    renderWithIntl(<SkillsHero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/技术专长/i);
  });

  it("renders the i18n 系统架构 badge (zh-CN)", () => {
    renderWithIntl(<SkillsHero />);
    expect(screen.getByText(/系统架构/i)).toBeInTheDocument();
  });

  it("renders the i18n 性能优先 badge (zh-CN)", () => {
    renderWithIntl(<SkillsHero />);
    expect(screen.getByText(/性能优先/i)).toBeInTheDocument();
  });

  it("renders the i18n description paragraph (zh-CN)", () => {
    renderWithIntl(<SkillsHero />);
    expect(screen.getByText(/8 年前端开发经验/)).toBeInTheDocument();
  });
});
