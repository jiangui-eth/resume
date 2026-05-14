import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ExpertiseCards from "../ExpertiseCards";

describe("ExpertiseCards", () => {
  it("renders the Battle-Tested Expertise heading", () => {
    render(<ExpertiseCards />);
    expect(
      screen.getByRole("heading", { name: /battle-tested expertise/i })
    ).toBeInTheDocument();
  });

  it("renders 4 expertise card headings", () => {
    render(<ExpertiseCards />);
    const cardHeadings = screen.getAllByRole("heading", { level: 3 });
    expect(cardHeadings.length).toBe(4);
  });

  it("renders card descriptions", () => {
    render(<ExpertiseCards />);
    // each card has a <p> description
    const section = screen
      .getByRole("heading", { name: /battle-tested expertise/i })
      .closest("div");
    expect(section).not.toBeNull();
    const paragraphs = section!.querySelectorAll("p");
    expect(paragraphs.length).toBeGreaterThan(0);
  });

  it("renders tag pills on expertise cards", () => {
    render(<ExpertiseCards />);
    const section = screen
      .getByRole("heading", { name: /battle-tested expertise/i })
      .closest("div");
    expect(section).not.toBeNull();
    const tags = section!.querySelectorAll("span");
    expect(tags.length).toBeGreaterThan(0);
  });
});
