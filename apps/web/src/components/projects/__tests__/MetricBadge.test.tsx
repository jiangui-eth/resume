import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import MetricBadge from "../MetricBadge";

describe("MetricBadge", () => {
  it("renders the metric value text", () => {
    render(<MetricBadge value="80%" label="Efficiency gain" />);

    expect(screen.getByText("80%")).toBeInTheDocument();
  });

  it("renders the metric label text", () => {
    render(<MetricBadge value="80%" label="Efficiency gain" />);

    expect(screen.getByText("Efficiency gain")).toBeInTheDocument();
  });
});
