import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { renderWithIntl } from "@/test/intl-test-utils";
import SkillsPage, { generateMetadata } from "../page";

describe("SkillsPage", () => {
  it("renders the Chinese skills heading", () => {
    renderWithIntl(<SkillsPage />);
    expect(screen.getByRole("heading", { name: /技术专长/i })).toBeInTheDocument();
  });

  it("renders the updated Chinese intro paragraph", () => {
    renderWithIntl(<SkillsPage />);
    expect(screen.getByText(/React \/ Next\.js/)).toBeInTheDocument();
  });

  it("generateMetadata returns a non-empty title", async () => {
    const meta = await generateMetadata();
    expect(typeof meta.title).toBe("string");
    expect((meta.title as string).length).toBeGreaterThan(0);
  });

  it("generateMetadata returns a non-empty description", async () => {
    const meta = await generateMetadata();
    expect(typeof meta.description).toBe("string");
    expect((meta.description as string).length).toBeGreaterThan(0);
  });

  it("renders without crashing", () => {
    expect(() => renderWithIntl(<SkillsPage />)).not.toThrow();
  });

  it("renders the Chinese core competencies badge", () => {
    renderWithIntl(<SkillsPage />);
    expect(screen.getByText("核心能力")).toBeInTheDocument();
  });
});
