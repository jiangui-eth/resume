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
  it("renders each decision title", () => {
    render(<TechnicalDecisions decisions={DECISIONS} />);

    expect(screen.getByText("SSR-first architecture")).toBeInTheDocument();
    expect(screen.getByText("Token-based theming")).toBeInTheDocument();
  });

  it("renders each decision explanation text", () => {
    render(<TechnicalDecisions decisions={DECISIONS} />);

    expect(screen.getByText(/render full HTML on the server/i)).toBeInTheDocument();
    expect(screen.getByText(/semantic tokens keep product variants aligned/i)).toBeInTheDocument();
  });
});
