import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SkillsPage, { generateMetadata } from "../page";

describe("SkillsPage", () => {
  it("renders the Chinese skills heading", () => {
    render(<SkillsPage />);
    expect(screen.getByRole("heading", { name: /技术专长/i })).toBeInTheDocument();
  });

  it("renders the updated Chinese intro paragraph", () => {
    render(<SkillsPage />);
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
    expect(() => render(<SkillsPage />)).not.toThrow();
  });

  it("renders the Chinese core competencies badge", () => {
    render(<SkillsPage />);
    expect(screen.getByText("核心能力")).toBeInTheDocument();
  });
});
