import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithIntl } from "@/test/intl-test-utils";

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
  it("renders the i18n section label (zh-CN: 技术决策)", () => {
    renderWithIntl(<TechnicalDecisions decisions={DECISIONS} />);
    expect(screen.getByText("技术决策")).toBeInTheDocument();
  });

  it("renders each decision title as highlighted text", () => {
    renderWithIntl(<TechnicalDecisions decisions={DECISIONS} />);
    expect(screen.getByText("SSR-first architecture")).toBeInTheDocument();
    expect(screen.getByText("Token-based theming")).toBeInTheDocument();
  });

  it("renders each decision explanation text", () => {
    renderWithIntl(<TechnicalDecisions decisions={DECISIONS} />);
    expect(screen.getByText(/render full HTML on the server/i)).toBeInTheDocument();
    expect(screen.getByText(/semantic tokens keep product variants aligned/i)).toBeInTheDocument();
  });

  it("renders nothing when decisions array is empty", () => {
    const { container } = renderWithIntl(<TechnicalDecisions decisions={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("wraps content in a glass-card container with h3 heading", () => {
    renderWithIntl(<TechnicalDecisions decisions={DECISIONS} />);
    const heading = screen.getByRole("heading", { name: "技术决策" });
    expect(heading.tagName).toBe("H3");
  });
});
