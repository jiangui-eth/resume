import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import TechnicalDecisions from "../TechnicalDecisions";

const DECISIONS = [
  {
    title: "SSR-first architecture",
    explanation: "Search-critical pages render full HTML on the server before hydration.",
  },
  {
    title: "Token-based theming",
    explanation: "Semantic tokens keep product variants aligned without duplicating component logic.",
  },
];

describe("TechnicalDecisions", () => {
  it("renders the 'Technical Decisions' section label", () => {
    render(<TechnicalDecisions decisions={DECISIONS} />);
    expect(screen.getByText("Technical Decisions")).toBeInTheDocument();
  });

  it("renders each decision title as highlighted text", () => {
    render(<TechnicalDecisions decisions={DECISIONS} />);

    expect(screen.getByText("SSR-first architecture")).toBeInTheDocument();
    expect(screen.getByText("Token-based theming")).toBeInTheDocument();
  });

  it("renders each decision explanation text", () => {
    render(<TechnicalDecisions decisions={DECISIONS} />);

    expect(screen.getByText(/render full HTML on the server/i)).toBeInTheDocument();
    expect(screen.getByText(/semantic tokens keep product variants aligned/i)).toBeInTheDocument();
  });

  it("renders nothing when decisions array is empty", () => {
    const { container } = render(<TechnicalDecisions decisions={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("wraps content in a glass-card container", () => {
    render(<TechnicalDecisions decisions={DECISIONS} />);
    const heading = screen.getByRole("heading", { name: "Technical Decisions" });
    expect(heading.tagName).toBe("H3");
  });
});
