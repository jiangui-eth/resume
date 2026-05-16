import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ResumePreviewPage from "../page";

describe("ResumePreviewPage", () => {
  it("renders without crashing", () => {
    expect(() => render(<ResumePreviewPage />)).not.toThrow();
  });

  it("renders two A4 resume pages", () => {
    render(<ResumePreviewPage />);
    const pages = document.querySelectorAll("article.page");
    expect(pages).toHaveLength(2);
  });

  it("renders the candidate name JianGui", () => {
    render(<ResumePreviewPage />);
    expect(screen.getAllByText(/JianGui/i).length).toBeGreaterThanOrEqual(1);
  });

  it("renders page 1 and page 2 branch labels", () => {
    render(<ResumePreviewPage />);
    expect(screen.getByText(/main · page 1\/2/i)).toBeInTheDocument();
    expect(screen.getByText(/main · page 2\/2/i)).toBeInTheDocument();
  });

  it("renders the skills section", () => {
    render(<ResumePreviewPage />);
    expect(screen.getByText("@skills")).toBeInTheDocument();
  });

  it("renders the projects section", () => {
    render(<ResumePreviewPage />);
    expect(screen.getByText("@projects")).toBeInTheDocument();
  });

  it("renders the education section", () => {
    render(<ResumePreviewPage />);
    expect(screen.getByText("@education")).toBeInTheDocument();
  });
});
