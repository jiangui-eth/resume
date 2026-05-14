import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SkillsPage, { generateMetadata } from "../page";

describe("SkillsPage", () => {
  it("renders a heading containing 'Technical Proficiency'", () => {
    render(<SkillsPage />);
    expect(
      screen.getByRole("heading", { name: /technical proficiency/i })
    ).toBeInTheDocument();
  });

  it("renders an intro subtitle text element", () => {
    render(<SkillsPage />);
    expect(
      screen.getByText(/languages, frameworks, and tools/i)
    ).toBeInTheDocument();
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

  it("renders the Tech Stack badge", () => {
    render(<SkillsPage />);
    expect(screen.getByText("Tech Stack")).toBeInTheDocument();
  });
});
