import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ExperiencePage, { generateMetadata } from "../page";

describe("ExperiencePage", () => {
  it("renders the Career Chronicle heading", () => {
    render(<ExperiencePage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText("Chronicle")).toBeInTheDocument();
  });

  it("renders the Career Chronicle badge label", () => {
    render(<ExperiencePage />);
    expect(screen.getByText("Career Chronicle")).toBeInTheDocument();
  });

  it("renders the subtitle paragraph", () => {
    render(<ExperiencePage />);
    expect(
      screen.getByText(/Five years shipping production systems/i),
    ).toBeInTheDocument();
  });

  it("renders the timeline placeholder div", () => {
    render(<ExperiencePage />);
    expect(document.getElementById("timeline-placeholder")).toBeInTheDocument();
  });

  it("generateMetadata returns correct title", async () => {
    const meta = await generateMetadata();
    expect(meta.title).toBe("Experience | jiangui.eth");
  });

  it("generateMetadata returns correct description", async () => {
    const meta = await generateMetadata();
    expect((meta.description as string)).toContain("full-stack");
  });
});
