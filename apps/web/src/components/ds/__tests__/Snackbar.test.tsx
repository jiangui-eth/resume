import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Snackbar } from "../../../../../../packages/ui/src/components/Snackbar/Snackbar";

describe("snackbar", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders nothing when open=false", () => {
    render(<Snackbar open={false} message="Hello" />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("renders message when open=true", () => {
    render(<Snackbar open message="File saved" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("File saved")).toBeInTheDocument();
  });

  it("has aria-live=polite", () => {
    render(<Snackbar open message="Done" />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
  });

  it("calls onClose after the default duration (4000ms)", () => {
    const onClose = vi.fn();
    render(<Snackbar open message="Done" onClose={onClose} />);
    vi.advanceTimersByTime(4000);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose after a custom duration", () => {
    const onClose = vi.fn();
    render(<Snackbar open message="Done" duration={2000} onClose={onClose} />);
    vi.advanceTimersByTime(1999);
    expect(onClose).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("renders action button with label", () => {
    render(
      <Snackbar
        open
        message="Item deleted"
        action={{ label: "Undo", onClick: vi.fn() }}
      />,
    );
    expect(screen.getByRole("button", { name: "Undo" })).toBeInTheDocument();
  });

  it("calls action.onClick when action button is clicked", () => {
    const onClick = vi.fn();
    render(
      <Snackbar
        open
        message="Item deleted"
        action={{ label: "Undo", onClick }}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Undo" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("uses inverse-surface background token class", () => {
    render(<Snackbar open message="Message" />);
    expect(screen.getByRole("status").className).toContain(
      "bg-ds-inverse-surface",
    );
  });
});
