import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithIntl } from "@/test/intl-test-utils";
import MetricsBar from "../MetricsBar";

describe("MetricsBar", () => {
  it("renders all 3 metric values", () => {
    renderWithIntl(<MetricsBar />);
    expect(screen.getByText("14x")).toBeInTheDocument();
    expect(screen.getByText("80%")).toBeInTheDocument();
    expect(screen.getByText("1.8s")).toBeInTheDocument();
  });

  it("renders all 3 localized metric titles (zh-CN)", () => {
    renderWithIntl(<MetricsBar />);
    expect(screen.getByText("SEO 流量增长")).toBeInTheDocument();
    expect(screen.getByText("构建速度提升")).toBeInTheDocument();
    expect(screen.getByText("LCP 性能优化")).toBeInTheDocument();
  });

  it("renders all 3 localized metric descriptions (zh-CN)", () => {
    renderWithIntl(<MetricsBar />);
    expect(screen.getByText(/自然搜索访问量/)).toBeInTheDocument();
    expect(screen.getByText(/Webpack → Vite/)).toBeInTheDocument();
    expect(screen.getByText(/首屏 LCP/)).toBeInTheDocument();
  });

  it("renders 3 article cards each with border-l-4 accent", () => {
    renderWithIntl(<MetricsBar />);
    const articles = screen.getAllByRole("article");
    expect(articles).toHaveLength(3);
    articles.forEach((article) => {
      expect(article.className).toContain("border-l-4");
    });
  });
});
