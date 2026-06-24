import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "../../../../../../packages/ui/src/components/Button/Button";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });

  it("applies filled variant by default", () => {
    render(<Button>Label</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-ds-primary");
    expect(btn).toHaveStyle({ color: "var(--ds-color-on-primary)" });
  });

  it("applies outlined variant classes", () => {
    render(<Button variant="outlined">Label</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("border-ds-outline");
    expect(btn.className).toContain("bg-transparent");
  });

  it("applies text variant classes", () => {
    render(<Button variant="text">Label</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-transparent");
    expect(btn.className).not.toContain("border-ds-outline");
  });

  it("applies fab variant classes", () => {
    render(<Button variant="fab">+</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-ds-primary-container");
    expect(btn.className).toContain("elevation-3");
    expect(btn).toHaveStyle({ color: "var(--ds-color-on-primary-container)" });
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Label</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is disabled and shows spinner when loading", () => {
    render(<Button loading>Label</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-busy", "true");
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("sets color and --state-layer-color via inline style", () => {
    render(<Button variant="outlined">Label</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveStyle({ color: "var(--ds-color-primary)" });
    expect(btn).toHaveStyle({
      "--state-layer-color": "var(--ds-color-primary)",
    });
  });
});
