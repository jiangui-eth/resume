import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { renderWithIntl } from "@/test/intl-test-utils";
import TechStackCards from "../TechStackCards";

describe("TechStackCards", () => {
  it("renders the i18n tech stack heading (zh-CN: 技术栈)", () => {
    renderWithIntl(<TechStackCards />);
    expect(screen.getByRole("heading", { name: /技术栈/i })).toBeInTheDocument();
  });

  it("renders at least one category heading (h3)", () => {
    renderWithIntl(<TechStackCards />);
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings.length).toBeGreaterThan(0);
  });

  it("renders technology pill tags", () => {
    renderWithIntl(<TechStackCards />);
    expect(screen.getByText("Webpack")).toBeInTheDocument();
    expect(screen.getByText("WebGPU")).toBeInTheDocument();
    expect(screen.getByText("pnpm Monorepos")).toBeInTheDocument();
  });

  it("renders 4 category columns", () => {
    renderWithIntl(<TechStackCards />);
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings.length).toBe(4);
  });
});
