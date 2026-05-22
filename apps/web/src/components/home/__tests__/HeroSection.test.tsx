import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { renderWithIntl } from "@/test/intl-test-utils";
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

import HeroSection from "../HeroSection";

describe("HeroSection", () => {
  it("renders the candidate name in the h1", () => {
    renderWithIntl(<HeroSection />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(profileData.name);
  });

  it("renders the i18n headline badge (zh-CN)", () => {
    renderWithIntl(<HeroSection />);
    expect(screen.getByText("AI 全栈工程师与 Web3 开发者")).toBeInTheDocument();
  });

  it("renders the i18n summary paragraph (zh-CN)", () => {
    renderWithIntl(<HeroSection />);
    expect(screen.getByText(/8 年前端开发经验/)).toBeInTheDocument();
  });

  it("renders a 查看项目 link pointing to /projects", () => {
    renderWithIntl(<HeroSection />);
    const link = screen.getByRole("link", { name: /查看项目/ });
    expect(link).toHaveAttribute("href", "/projects");
  });

  it("renders a 获取联系方式 anchor linking to #contact", () => {
    renderWithIntl(<HeroSection />);
    const link = screen.getByRole("link", { name: /获取联系方式/ });
    expect(link).toHaveAttribute("href", "#contact");
  });

  it("renders the hero section landmark", () => {
    renderWithIntl(<HeroSection />);
    expect(screen.getByRole("region", { name: /hero/i })).toBeInTheDocument();
  });
});
