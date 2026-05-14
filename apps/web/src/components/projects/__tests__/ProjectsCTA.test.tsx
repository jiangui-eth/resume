import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProjectsCTA from "../ProjectsCTA";

describe("ProjectsCTA", () => {
  it("renders the heading", () => {
    render(<ProjectsCTA />);
    expect(
      screen.getByRole("heading", { name: /interested in the technical depth/i })
    ).toBeInTheDocument();
  });

  it("renders the Schedule Technical Interview link", () => {
    render(<ProjectsCTA />);
    expect(
      screen.getByRole("link", { name: /schedule technical interview/i })
    ).toBeInTheDocument();
  });

  it("Schedule Technical Interview href points to mailto or /contact", () => {
    render(<ProjectsCTA />);
    const link = screen.getByRole("link", {
      name: /schedule technical interview/i,
    });
    const href = link.getAttribute("href") ?? "";
    expect(href.startsWith("mailto:") || href.startsWith("/contact")).toBe(
      true
    );
  });

  it("renders the View GitHub link", () => {
    render(<ProjectsCTA />);
    expect(
      screen.getByRole("link", { name: /view github/i })
    ).toBeInTheDocument();
  });

  it("View GitHub href points to github.com", () => {
    render(<ProjectsCTA />);
    const link = screen.getByRole("link", { name: /view github/i });
    expect(link.getAttribute("href")).toMatch(/^https:\/\/github\.com\//);
  });

  it("View GitHub link opens in new tab with noopener", () => {
    render(<ProjectsCTA />);
    const link = screen.getByRole("link", { name: /view github/i });
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toContain("noopener");
  });
});
