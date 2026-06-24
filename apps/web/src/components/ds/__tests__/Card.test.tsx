import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Card } from "../../../../../../packages/ui/src/components/Card/Card";

describe("card", () => {
  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders as a div by default (not clickable)", () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.querySelector("div")).toBeInTheDocument();
    expect(container.querySelector("button")).not.toBeInTheDocument();
  });

  it("renders as a button when clickable", () => {
    render(<Card clickable>Content</Card>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("applies elevated variant classes", () => {
    const { container } = render(<Card variant="elevated">Content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("bg-ds-surface");
    expect(el.className).toContain("elevation-1");
  });

  it("applies filled variant classes", () => {
    const { container } = render(<Card variant="filled">Content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("bg-ds-surface-variant");
  });

  it("applies outlined variant classes", () => {
    const { container } = render(<Card variant="outlined">Content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("bg-ds-surface");
    expect(el.className).toContain("border-ds-outline-variant");
  });

  it("adds state-layer class when clickable", () => {
    render(<Card clickable>Content</Card>);
    expect(screen.getByRole("button").className).toContain("state-layer");
  });

  it("calls onClick when clickable card is clicked", async () => {
    const onClick = vi.fn();
    render(
      <Card clickable onClick={onClick}>
        Click me
      </Card>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("passes className prop", () => {
    const { container } = render(<Card className="p-4">Content</Card>);
    expect((container.firstChild as HTMLElement).className).toContain("p-4");
  });
});
