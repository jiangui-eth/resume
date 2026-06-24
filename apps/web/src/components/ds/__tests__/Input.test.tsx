import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Input } from "../../../../../../packages/ui/src/components/Input/Input";

describe("input", () => {
  it("renders the label", () => {
    render(<Input label="Email" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders an input element", () => {
    render(<Input label="Name" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("associates label with input via htmlFor", () => {
    render(<Input label="Username" />);
    const input = screen.getByRole("textbox");
    const label = screen.getByText("Username");
    expect(input.id).toBe((label as HTMLLabelElement).htmlFor);
  });

  it("calls onChange with the new value when typed", async () => {
    const onChange = vi.fn();
    render(<Input label="Search" onChange={onChange} />);
    await userEvent.type(screen.getByRole("textbox"), "hello");
    expect(onChange).toHaveBeenCalledWith("hello");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Input label="Field" disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("sets aria-invalid when error=true", () => {
    render(<Input label="Field" error />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("shows errorText when error=true", () => {
    render(<Input label="Field" error errorText="Required field" />);
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });

  it("shows helperText when no error", () => {
    render(<Input label="Field" helperText="Max 100 characters" />);
    expect(screen.getByText("Max 100 characters")).toBeInTheDocument();
  });

  it("renders outlined variant border class", () => {
    const { container } = render(<Input label="Field" variant="outlined" />);
    expect(container.querySelector(".border-ds-outline")).toBeInTheDocument();
  });

  it("renders filled variant with surface-variant background", () => {
    const { container } = render(<Input label="Field" variant="filled" />);
    expect(
      container.querySelector(".bg-ds-surface-variant"),
    ).toBeInTheDocument();
  });
});
