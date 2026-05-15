import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

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

describe("AboutSection", () => {
  it("renders the H2 headline", () => {
    render(<AboutSection />);
    expect(screen.getByText("Precision in Every Pixel")).toBeInTheDocument();
  });

  it("renders the bio summary from profile data", () => {
    render(<AboutSection />);
    expect(screen.getByText(/5\+ years of experience/i)).toBeInTheDocument();
  });

  it("renders all three quantified stats", () => {
    render(<AboutSection />);
    expect(screen.getByText("14x")).toBeInTheDocument();
    expect(screen.getByText("1.8s")).toBeInTheDocument();
    expect(screen.getByText("80%")).toBeInTheDocument();
  });

  it("renders stat labels", () => {
    render(<AboutSection />);
    expect(screen.getByText("SEO Growth")).toBeInTheDocument();
    expect(screen.getByText("LCP Optimized")).toBeInTheDocument();
    expect(screen.getByText("Build Speedup")).toBeInTheDocument();
  });

  it("renders the avatar image with grayscale class", () => {
    render(<AboutSection />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", expect.stringContaining("lh3.googleusercontent.com"));
    expect(img).toHaveAttribute("alt", expect.stringContaining("Jiangui"));
    expect(img.className).toContain("grayscale");
  });

  it("has accessible section landmark", () => {
    render(<AboutSection />);
    expect(screen.getByRole("region", { name: /about/i })).toBeInTheDocument();
  });
});
