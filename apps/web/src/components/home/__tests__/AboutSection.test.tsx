import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// ── Next.js mocks ──────────────────────────────────────────────────────────────

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) => <img src={src} alt={alt} {...props} />,
}));

import AboutSection from "../AboutSection";

// ── Tests ──────────────────────────────────────────────────────────────────────

describe("AboutSection", () => {
  it("renders the section label", () => {
    render(<AboutSection />);
    expect(screen.getByText("Precision in Every Pixel")).toBeInTheDocument();
  });

  it("renders the headline copy", () => {
    render(<AboutSection />);
    expect(screen.getByText(/building for/i)).toBeInTheDocument();
    expect(screen.getByText(/shipping with intent/i)).toBeInTheDocument();
  });

  it("renders the bio summary from profile data", () => {
    render(<AboutSection />);
    // The summary paragraph is uniquely identifiable by its longer phrase
    expect(
      screen.getByText(/5\+ years of experience/i)
    ).toBeInTheDocument();
  });

  it("renders all three quantified stats", () => {
    render(<AboutSection />);
    expect(screen.getByText("14×")).toBeInTheDocument();
    expect(screen.getByText("1.8s")).toBeInTheDocument();
    expect(screen.getByText("80%")).toBeInTheDocument();
  });

  it("renders stat labels", () => {
    render(<AboutSection />);
    expect(screen.getByText("SEO Growth")).toBeInTheDocument();
    expect(screen.getByText("LCP")).toBeInTheDocument();
    expect(screen.getByText("Build Speed")).toBeInTheDocument();
  });

  it("renders the avatar image with correct alt text", () => {
    render(<AboutSection />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/images/avatar/avatar.jpg");
    expect(img).toHaveAttribute("alt", expect.stringContaining("Jiangui"));
  });

  it("renders the ENS name overlay on the photo card", () => {
    render(<AboutSection />);
    expect(screen.getByText("jiangui.eth")).toBeInTheDocument();
  });

  it("has accessible section landmark", () => {
    render(<AboutSection />);
    expect(screen.getByRole("region", { name: /about/i })).toBeInTheDocument();
  });
});
