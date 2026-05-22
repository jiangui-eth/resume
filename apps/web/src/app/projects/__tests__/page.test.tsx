import { readFileSync } from "node:fs";

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ProjectsPage, { generateMetadata } from "../page";

describe("ProjectsPage", () => {
  it("renders the Chinese projects heading", () => {
    render(<ProjectsPage />);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /架构/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the Chinese subtitle beneath the heading", () => {
    render(<ProjectsPage />);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: /架构/i,
    });
    const subtitle = screen.getByText(/技术领导力与前端工程实践/);

    expect(subtitle.tagName).toBe("P");
    expect(
      heading.compareDocumentPosition(subtitle) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("generateMetadata returns a non-empty title", async () => {
    const metadata = await generateMetadata();

    expect(typeof metadata.title).toBe("string");
    expect(metadata.title).toBeTruthy();
  });

  it("generateMetadata returns a non-empty description", async () => {
    const metadata = await generateMetadata();

    expect(typeof metadata.description).toBe("string");
    expect(metadata.description).toBeTruthy();
  });

  it("does not import framer-motion or use use client", () => {
    const source = readFileSync("src/app/projects/page.tsx", "utf8");

    expect(source).not.toContain("framer-motion");
    expect(source).not.toContain('"use client"');
    expect(source).not.toContain("'use client'");
  });

  it("renders without crashing when mounted", () => {
    const { container } = render(<ProjectsPage />);

    expect(container.firstChild).not.toBeNull();
  });
});
