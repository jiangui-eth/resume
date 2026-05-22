import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ExperiencePage, { generateMetadata } from "../page";

describe("ExperiencePage", () => {
  it("renders the Chinese experience heading", () => {
    render(<ExperiencePage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText("经历")).toBeInTheDocument();
  });

  it("renders the Chinese experience badge label", () => {
    render(<ExperiencePage />);
    expect(screen.getByText("职业历程")).toBeInTheDocument();
  });

  it("renders the updated Chinese summary paragraph", () => {
    render(<ExperiencePage />);
    expect(screen.getByText(/8 年前端开发经验/)).toBeInTheDocument();
  });

  it("renders the timeline placeholder div", () => {
    render(<ExperiencePage />);
    expect(document.getElementById("timeline-placeholder")).toBeInTheDocument();
  });

  it("generateMetadata returns correct title", async () => {
    const meta = await generateMetadata();
    expect(meta.title).toBe("Experience | jiangui.eth");
  });

  it("generateMetadata returns the updated Chinese description", async () => {
    const meta = await generateMetadata();
    expect((meta.description as string)).toContain("前端开发经历");
  });
});
