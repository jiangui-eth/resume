import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

import ProjectBlock, { type ProjectBlockData } from "../ProjectBlock";

const BASE_PROJECT: ProjectBlockData = {
  id: "project-1",
  name: "Wind Power RAG Platform",
  tagline: "RAG knowledge workspace for support teams",
  domainTags: ["AI", "RAG"],
  background: "A retrieval product for wind-energy customer support operations.",
  technicalDecisions: [
    {
      title: "Citation-first answers",
      explanation: "Every answer includes source evidence and provenance.",
    },
  ],
  metrics: [
    { label: "Trust score", value: "9.0 / 10" },
    { label: "Handling time", value: "-80%" },
  ],
  images: [
    { src: "/images/projects/wind-power.jpg", alt: "Wind Power RAG Platform concept visual" },
  ],
  links: [],
  techTags: ["Next.js", "OpenAI"],
  featured: true,
  order: 1,
};

describe("ProjectBlock", () => {
  it("renders the project name", () => {
    render(<ProjectBlock project={BASE_PROJECT} />);

    expect(screen.getByText("Wind Power RAG Platform")).toBeInTheDocument();
  });

  it("renders the domain tag", () => {
    render(<ProjectBlock project={BASE_PROJECT} />);

    expect(screen.getByText("AI")).toBeInTheDocument();
  });

  it("renders GitHub, Demo, and Case Study buttons only when provided", () => {
    const projectWithLinks: ProjectBlockData = {
      ...BASE_PROJECT,
      links: [
        { type: "github", url: "https://github.com/example/project" },
        { type: "demo", url: "https://example.com/demo" },
        { type: "case-study", url: "/projects" },
      ],
    };

    const { rerender } = render(<ProjectBlock project={projectWithLinks} />);

    expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Demo" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Case Study" })).toBeInTheDocument();

    rerender(<ProjectBlock project={BASE_PROJECT} />);

    expect(screen.queryByRole("link", { name: "GitHub" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Demo" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Case Study" })).not.toBeInTheDocument();
  });

  it("renders without crashing when image src is absent", () => {
    const projectWithoutImage: ProjectBlockData = {
      ...BASE_PROJECT,
      images: [],
    };

    render(<ProjectBlock project={projectWithoutImage} />);

    expect(
      screen.getByRole("heading", { name: "Wind Power RAG Platform" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Visual Pending")).toBeInTheDocument();
  });
});
