import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "@/test/intl-test-utils";

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
  it("renders the i18n title (zh-CN)", () => {
    renderWithIntl(<AboutSection />);
    expect(screen.getByText("深耕工程，精益求精")).toBeInTheDocument();
  });

  it("renders the i18n bio summary (zh-CN)", () => {
    renderWithIntl(<AboutSection />);
    expect(screen.getByText(/8 年前端开发经验/)).toBeInTheDocument();
  });

  it("renders all three quantified stats", () => {
    renderWithIntl(<AboutSection />);
    expect(screen.getByText("14x")).toBeInTheDocument();
    expect(screen.getByText("1.8s")).toBeInTheDocument();
    expect(screen.getByText("80%")).toBeInTheDocument();
  });

  it("renders stat labels", () => {
    renderWithIntl(<AboutSection />);
    expect(screen.getByText("SEO Growth")).toBeInTheDocument();
    expect(screen.getByText("LCP Optimized")).toBeInTheDocument();
    expect(screen.getByText("Build Speedup")).toBeInTheDocument();
  });

  it("renders the avatar image with grayscale class", () => {
    renderWithIntl(<AboutSection />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", expect.stringContaining("/images/avatar/jiangui.eth.jpg"));
    expect(img).toHaveAttribute("alt", expect.stringContaining("JianGui"));
    expect(img.className).toContain("grayscale");
  });

  it("has accessible section landmark", () => {
    renderWithIntl(<AboutSection />);
    expect(screen.getByRole("region", { name: /about/i })).toBeInTheDocument();
  });
});
