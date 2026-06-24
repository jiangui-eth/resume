import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Chip } from "../../../../../../packages/ui/src/components/Chip/Chip";

describe("chip", () => {
  it("renders the label", () => {
    render(<Chip label="Design" />);
    expect(screen.getByRole("button", { name: /Design/i })).toBeInTheDocument();
  });

  it("is not selected by default", () => {
    render(<Chip label="Tag" />);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("border-ds-outline");
    expect(btn.className).not.toContain("bg-ds-secondary-container");
  });

  it("applies selected styles when selected=true", () => {
    render(<Chip label="Tag" selected />);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-ds-secondary-container");
  });

  it("is disabled when disabled=true", () => {
    render(<Chip label="Tag" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Chip label="Tag" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: /Tag/i }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders a remove button for input variant", () => {
    render(<Chip variant="input" label="Tag" onRemove={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: /Remove Tag/i }),
    ).toBeInTheDocument();
  });

  it("calls onRemove when remove icon is clicked", async () => {
    const onRemove = vi.fn();
    render(<Chip variant="input" label="Tag" onRemove={onRemove} />);
    await userEvent.click(screen.getByRole("button", { name: /Remove Tag/i }));
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it("renders leading icon", () => {
    render(<Chip label="Tag" icon={<span data-testid="icon" />} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});
