import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProjectsCTA from "../ProjectsCTA";

describe("ProjectsCTA", () => {
  it("renders the Chinese CTA heading", () => {
    render(<ProjectsCTA />);
    expect(screen.getByRole("heading", { name: /深入了解技术细节/i })).toBeInTheDocument();
  });

  it("renders the Chinese technical interview link", () => {
    render(<ProjectsCTA />);
    expect(screen.getByRole("link", { name: /预约技术交流/i })).toBeInTheDocument();
  });

  it("keeps the technical interview link target unchanged", () => {
    render(<ProjectsCTA />);
    const link = screen.getByRole("link", { name: /预约技术交流/i });
    const href = link.getAttribute("href") ?? "";
    expect(href.startsWith("mailto:") || href.startsWith("/contact")).toBe(
      true
    );
  });

  it("renders the Chinese GitHub link", () => {
    render(<ProjectsCTA />);
    expect(screen.getByRole("link", { name: /查看 GitHub/i })).toBeInTheDocument();
  });

  it("keeps the GitHub link href unchanged", () => {
    render(<ProjectsCTA />);
    const link = screen.getByRole("link", { name: /查看 GitHub/i });
    expect(link.getAttribute("href")).toMatch(/^https:\/\/github\.com\//);
  });

  it("keeps the GitHub link security attributes unchanged", () => {
    render(<ProjectsCTA />);
    const link = screen.getByRole("link", { name: /查看 GitHub/i });
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toContain("noopener");
  });
});
