import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "@/test/intl-test-utils";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} data-testid="project-image" />
  ),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href as string} {...props}>
      {children}
    </a>
  ),
}));

import ProjectsSection from "../ProjectsSection";

describe("ProjectsSection", () => {
  it('renders the "精选项目" heading (zh-CN)', () => {
    renderWithIntl(<ProjectsSection />);
    expect(screen.getByText("精选项目")).toBeInTheDocument();
  });

  it('renders the "查看全部项目" link pointing to /projects', () => {
    renderWithIntl(<ProjectsSection />);
    const link = screen.getByRole("link", { name: /查看全部项目/ });
    expect(link).toHaveAttribute("href", "/projects");
  });

  it("renders top 2 featured project names (sorted by order)", () => {
    renderWithIntl(<ProjectsSection />);
    expect(screen.getByText("Wind Power RAG Platform")).toBeInTheDocument();
    expect(screen.getByText("Gate.com SEO Special Project")).toBeInTheDocument();
  });

  it("renders project taglines", () => {
    renderWithIntl(<ProjectsSection />);
    expect(
      screen.getByText(/Enterprise RAG knowledge platform for wind-power customer service/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Performance-first SEO architecture/i)).toBeInTheDocument();
  });

  it("renders tech tag pills for both projects", () => {
    renderWithIntl(<ProjectsSection />);
    expect(screen.getAllByText("Next.js").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("React").length).toBeGreaterThanOrEqual(1);
  });

  it('renders two "案例详情" links both pointing to /projects', () => {
    renderWithIntl(<ProjectsSection />);
    const links = screen.getAllByRole("link", { name: /案例详情/ });
    expect(links).toHaveLength(2);
    links.forEach((link) => expect(link).toHaveAttribute("href", "/projects"));
  });

  it("renders two article elements (one per project row)", () => {
    renderWithIntl(<ProjectsSection />);
    expect(screen.getAllByRole("article")).toHaveLength(2);
  });

  it('has accessible section landmark with i18n label "精选项目"', () => {
    renderWithIntl(<ProjectsSection />);
    expect(screen.getByRole("region", { name: /精选项目/ })).toBeInTheDocument();
  });
});
