import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PrintPage, { metadata } from "../page";

Object.defineProperty(window, "print", { value: vi.fn(), writable: true });

describe("printPage", () => {
  it("renders without crashing", () => {
    render(<PrintPage />);
  });

  it("includes a heading with the person's name", () => {
    render(<PrintPage />);
    expect(
      screen.getByRole("heading", { name: /jiangui/i }),
    ).toBeInTheDocument();
  });

  it("renders the Print Resume button", () => {
    render(<PrintPage />);
    expect(
      screen.getByRole("button", { name: /print resume/i }),
    ).toBeInTheDocument();
  });

  it("generateMetadata returns a non-empty title", () => {
    expect(metadata.title).toBeTruthy();
  });

  it("generateMetadata returns a non-empty description", () => {
    expect(metadata.description).toBeTruthy();
  });
});
