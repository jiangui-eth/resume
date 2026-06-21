import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithIntl } from "@/test/intl-test-utils";
import ExpertiseCards from "../ExpertiseCards";

describe("expertiseCards", () => {
  it("renders the i18n expertise section heading (zh-CN: 实战经验沉淀)", () => {
    renderWithIntl(<ExpertiseCards />);
    expect(
      screen.getByRole("heading", { name: /实战经验沉淀/ }),
    ).toBeInTheDocument();
  });

  it("renders 3 expertise card titles (from skills.json)", () => {
    renderWithIntl(<ExpertiseCards />);
    expect(
      screen.getByRole("heading", { name: /SSR\/ISR Strategies/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Micro-frontends/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Design System Arch/i }),
    ).toBeInTheDocument();
  });

  it("renders the i18n first expertise description (zh-CN)", () => {
    renderWithIntl(<ExpertiseCards />);
    expect(screen.getByText(/Core Web Vitals/)).toBeInTheDocument();
  });

  it("renders all 3 Material Symbols icon containers", () => {
    renderWithIntl(<ExpertiseCards />);
    const icons = document.querySelectorAll(".material-symbols-outlined");
    expect(icons.length).toBe(3);
  });

  it("renders i18n description paragraphs for each card (zh-CN)", () => {
    renderWithIntl(<ExpertiseCards />);
    expect(
      screen.getByText(/搜索引擎完整抓取与实时数据并重/),
    ).toBeInTheDocument();
    expect(screen.getByText(/多团队前端协同架构设计经验/)).toBeInTheDocument();
    expect(screen.getByText(/沉淀 16\+ 高复用业务组件/)).toBeInTheDocument();
  });
});
