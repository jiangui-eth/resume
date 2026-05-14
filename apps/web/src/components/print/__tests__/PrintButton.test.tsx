import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import PrintButton from "../PrintButton";

describe("PrintButton", () => {
  beforeEach(() => {
    Object.defineProperty(window, "print", { value: vi.fn(), writable: true });
  });

  it("renders a button with text 'Print Resume'", () => {
    render(<PrintButton />);
    expect(
      screen.getByRole("button", { name: /print resume/i })
    ).toBeInTheDocument();
  });

  it("calls window.print() when clicked", () => {
    const mockPrint = vi.fn();
    Object.defineProperty(window, "print", { value: mockPrint, writable: true });
    render(<PrintButton />);
    fireEvent.click(screen.getByRole("button", { name: /print resume/i }));
    expect(mockPrint).toHaveBeenCalledOnce();
  });
});
