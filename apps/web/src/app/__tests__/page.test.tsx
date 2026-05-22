import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { renderWithIntl } from "@/test/intl-test-utils";
import HomePage from "../page";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { src: string }) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

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

vi.mock("@/lib/analytics", () => ({ track: vi.fn() }));

describe("Home Page — /", () => {
  it("renders the hero section with candidate name in h1", () => {
    renderWithIntl(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders the hero region landmark", () => {
    renderWithIntl(<HomePage />);
    expect(screen.getByRole("region", { name: /hero/i })).toBeInTheDocument();
  });

  it("renders the About section", () => {
    renderWithIntl(<HomePage />);
    expect(
      screen.getByText(/深耕工程，精益求精/),
    ).toBeInTheDocument();
  });

  it("renders the Capability section heading", () => {
    renderWithIntl(<HomePage />);
    expect(screen.getByText(/核心技术栈/)).toBeInTheDocument();
  });

  it("renders the Selected Works heading", () => {
    renderWithIntl(<HomePage />);
    expect(screen.getByText(/精选项目/)).toBeInTheDocument();
  });

  it("renders the Contact section", () => {
    renderWithIntl(<HomePage />);
    expect(
      screen.getByRole("region", { name: /contact/i }),
    ).toBeInTheDocument();
  });
});
