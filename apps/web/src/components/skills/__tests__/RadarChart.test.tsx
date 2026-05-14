import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RadarChart from "../RadarChart";

describe("RadarChart", () => {
  it("renders the SVG with aria-label", () => {
    const { container } = render(<RadarChart />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("aria-label");
  });

  it("renders the accessible text list with skill scores", () => {
    render(<RadarChart />);
    const list = screen.getByRole("list", { name: /skill scores/i });
    expect(list).toBeInTheDocument();
    expect(list.querySelectorAll("li").length).toBeGreaterThan(0);
  });

  it("renders skill labels in the text list", () => {
    render(<RadarChart />);
    const items = screen.getAllByRole("listitem");
    expect(items.length).toBeGreaterThan(0);
  });

  it("renders percentage values for each skill", () => {
    render(<RadarChart />);
    const percentages = screen.getAllByText(/%/);
    expect(percentages.length).toBeGreaterThan(0);
  });
});
