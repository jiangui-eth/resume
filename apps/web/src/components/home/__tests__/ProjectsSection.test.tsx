import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// ── Mocks ──────────────────────────────────────────────────────────────────────

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

// ── Tests ──────────────────────────────────────────────────────────────────────

describe("ProjectsSection", () => {
  it('renders the "Selected Works" badge label', () => {
    render(<ProjectsSection />);
    expect(screen.getByText("Selected Works")).toBeInTheDocument();
  });

  it('renders the "See all projects" link pointing to /projects', () => {
    render(<ProjectsSection />);
    const link = screen.getByRole("link", { name: /see all projects/i });
    expect(link).toHaveAttribute("href", "/projects");
  });

  it("renders all three project card names", () => {
    render(<ProjectsSection />);
    expect(screen.getByText("Wind Power IoT Platform")).toBeInTheDocument();
    expect(screen.getByText("Gate SEO Platform")).toBeInTheDocument();
    expect(screen.getByText("Chaos Developer Platform")).toBeInTheDocument();
  });

  it("renders all three project taglines", () => {
    render(<ProjectsSection />);
    expect(screen.getByText(/Real-time turbine monitoring/i)).toBeInTheDocument();
    expect(screen.getByText(/Performance-first SEO analytics/i)).toBeInTheDocument();
    expect(screen.getByText(/Self-service internal platform/i)).toBeInTheDocument();
  });

  it("renders domain tag pills", () => {
    render(<ProjectsSection />);
    expect(screen.getByText("IoT")).toBeInTheDocument();
    expect(screen.getByText("Web3")).toBeInTheDocument();
    expect(screen.getByText("DevOps")).toBeInTheDocument();
  });

  it("renders tech tag pills", () => {
    render(<ProjectsSection />);
    // Some tags repeat across cards; use getAllByText to handle multiples
    expect(screen.getAllByText("React").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Next.js").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Go").length).toBeGreaterThanOrEqual(1);
  });

  it('renders three "Case Study" links all pointing to /projects', () => {
    render(<ProjectsSection />);
    const links = screen.getAllByRole("link", { name: /case study/i });
    expect(links).toHaveLength(3);
    links.forEach((link) => expect(link).toHaveAttribute("href", "/projects"));
  });

  it("renders three article elements (one per card)", () => {
    render(<ProjectsSection />);
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });

  it('has accessible section landmark with label "Selected Works"', () => {
    render(<ProjectsSection />);
    expect(screen.getByRole("region", { name: /selected works/i })).toBeInTheDocument();
  });
});
