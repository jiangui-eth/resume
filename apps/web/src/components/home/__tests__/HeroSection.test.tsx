import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import HeroSection from "../HeroSection";
import profileData from "@/data/profile.json";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("HeroSection", () => {
  it("renders the candidate name in the h1", () => {
    render(<HeroSection />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      profileData.name,
    );
  });

  it("renders the headline badge text", () => {
    render(<HeroSection />);
    expect(screen.getByText(profileData.headline)).toBeInTheDocument();
  });

  it("renders the summary paragraph", () => {
    render(<HeroSection />);
    expect(screen.getByText(profileData.summary)).toBeInTheDocument();
  });

  it("renders a View Projects link pointing to /projects", () => {
    render(<HeroSection />);
    const link = screen.getByRole("link", { name: /view projects/i });
    expect(link).toHaveAttribute("href", "/projects");
  });

  it("renders a Get in Touch anchor linking to #contact", () => {
    render(<HeroSection />);
    const link = screen.getByRole("link", { name: /get in touch/i });
    expect(link).toHaveAttribute("href", "#contact");
  });

  it("renders the hero section landmark", () => {
    render(<HeroSection />);
    expect(screen.getByRole("region", { name: /hero/i })).toBeInTheDocument();
  });
});
