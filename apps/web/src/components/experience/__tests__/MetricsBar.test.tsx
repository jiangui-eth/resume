import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ExperiencePage from "@/app/experience/page";

import MetricsBar from "../MetricsBar";

describe("MetricsBar", () => {
  it("renders all 3 metric values", () => {
    render(<MetricsBar />);

    expect(screen.getByText("14x")).toBeInTheDocument();
    expect(screen.getByText("80%")).toBeInTheDocument();
    expect(screen.getByText("1.8s")).toBeInTheDocument();
  });

  it("renders all 3 metric titles", () => {
    render(<MetricsBar />);

    expect(screen.getByText("SEO Traffic Growth")).toBeInTheDocument();
    expect(screen.getByText("Build Speed Increase")).toBeInTheDocument();
    expect(screen.getByText("LCP Optimisation")).toBeInTheDocument();
  });

  it("renders all 3 descriptions", () => {
    render(<MetricsBar />);

    expect(screen.getByText(/Organic search/i)).toBeInTheDocument();
    expect(screen.getByText(/CI pipeline/i)).toBeInTheDocument();
    expect(screen.getByText(/Page load/i)).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    render(<MetricsBar />);

    expect(screen.getByText("SEO Traffic Growth")).toBeInTheDocument();
  });
});

describe("ExperiencePage metrics bar", () => {
  it("renders all 3 metric values", () => {
    render(<ExperiencePage />);

    expect(screen.getByText("14x")).toBeInTheDocument();
    expect(screen.getByText("80%")).toBeInTheDocument();
    expect(screen.getByText("1.8s")).toBeInTheDocument();
  });
});
