import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Dialog } from "../../../../../../packages/ui/src/components/Dialog/Dialog";

describe("dialog", () => {
  it("renders nothing when open=false", () => {
    render(<Dialog open={false} onClose={vi.fn()} title="Test" />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders when open=true", () => {
    render(<Dialog open onClose={vi.fn()} title="Test Dialog" />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<Dialog open onClose={vi.fn()} title="Confirm action" />);
    expect(screen.getByText("Confirm action")).toBeInTheDocument();
  });

  it("renders the description when provided", () => {
    render(
      <Dialog
        open
        onClose={vi.fn()}
        title="Title"
        description="Are you sure?"
      />,
    );
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  it("has aria-modal=true", () => {
    render(<Dialog open onClose={vi.fn()} title="Title" />);
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });

  it("calls onClose when Escape is pressed", async () => {
    const onClose = vi.fn();
    render(<Dialog open onClose={onClose} title="Title" />);
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose when backdrop is clicked", async () => {
    const onClose = vi.fn();
    const { container } = render(
      <Dialog open onClose={onClose} title="Title" />,
    );
    const backdrop = container.querySelector(
      '[aria-hidden="true"]',
    ) as HTMLElement;
    await userEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("renders actions slot", () => {
    render(
      <Dialog
        open
        onClose={vi.fn()}
        title="Title"
        actions={<button>Confirm</button>}
      />,
    );
    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
  });
});
