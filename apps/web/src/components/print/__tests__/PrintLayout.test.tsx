import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PrintLayout from "../PrintLayout";

describe("printLayout", () => {
  it("renders the person's name in a heading", () => {
    render(<PrintLayout />);
    expect(
      screen.getByRole("heading", { name: /jiangui/i }),
    ).toBeInTheDocument();
  });

  it("renders the job title", () => {
    render(<PrintLayout />);
    const matches = screen.getAllByText(/senior full-stack engineer/i);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("renders left column sections: contact, tech skills, education, languages", () => {
    render(<PrintLayout />);
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
    expect(screen.getByText(/tech skills/i)).toBeInTheDocument();
    expect(screen.getByText(/education/i)).toBeInTheDocument();
    expect(screen.getByText(/languages/i)).toBeInTheDocument();
  });

  it("renders right column with Professional Experience heading", () => {
    render(<PrintLayout />);
    expect(
      screen.getByRole("heading", { name: /professional experience/i }),
    ).toBeInTheDocument();
  });

  it("renders right column with Key Projects heading", () => {
    render(<PrintLayout />);
    expect(
      screen.getByRole("heading", { name: /key projects/i }),
    ).toBeInTheDocument();
  });
});
