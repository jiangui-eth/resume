import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { renderWithIntl } from "@/test/intl-test-utils";

vi.mock("@/lib/analytics", () => ({ track: vi.fn() }));

import SkillsCTA from "../SkillsCTA";

describe("SkillsCTA", () => {
  it("renders the i18n CTA heading (zh-CN: 期待下一个架构挑战)", () => {
    renderWithIntl(<SkillsCTA />);
    expect(
      screen.getByRole("heading", { name: /期待下一个架构挑战/i })
    ).toBeInTheDocument();
  });

  it("renders the i18n contact link (zh-CN: 联系我)", () => {
    renderWithIntl(<SkillsCTA />);
    const link = screen.getByRole("link", { name: /联系我/i });
    expect(link).toBeInTheDocument();
  });

  it("keeps the contact link target unchanged", () => {
    renderWithIntl(<SkillsCTA />);
    const link = screen.getByRole("link", { name: /联系我/i });
    expect(link).toHaveAttribute("href", "mailto:jiangui.eth@gmail.com");
  });

  it("renders a supporting paragraph below the heading", () => {
    renderWithIntl(<SkillsCTA />);
    const section = screen.getByRole("heading", { name: /期待下一个架构挑战/i }).closest("div");
    expect(section!.querySelector("p")).not.toBeNull();
  });
});
