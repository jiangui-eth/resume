import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactSection from "../ContactSection";

describe("ContactSection", () => {
  it("renders the section heading", () => {
    render(<ContactSection />);
    expect(screen.getByText(/next generation of web/i)).toBeInTheDocument();
  });

  it("renders the email address visibly", () => {
    render(<ContactSection />);
    expect(screen.getByText("jiangui.eth@gmail.com")).toBeInTheDocument();
  });

  it("email card has a mailto link", () => {
    render(<ContactSection />);
    const link = screen.getByRole("link", { name: /jiangui\.eth@gmail\.com/i });
    expect(link).toHaveAttribute("href", "mailto:jiangui.eth@gmail.com");
  });

  it("renders WeChat and Phone cards with masked content by default", () => {
    render(<ContactSection />);
    const masked = screen.getAllByText("••••••••");
    expect(masked.length).toBeGreaterThanOrEqual(2);
  });

  it("renders Reveal buttons for WeChat and Phone", () => {
    render(<ContactSection />);
    expect(screen.getByRole("button", { name: /reveal wechat/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reveal phone/i })).toBeInTheDocument();
  });

  it("reveals WeChat content and shows Hide button on click", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);
    const revealBtn = screen.getByRole("button", { name: /reveal wechat/i });
    await user.click(revealBtn);
    expect(screen.getByRole("button", { name: /hide wechat/i })).toBeInTheDocument();
    expect(screen.getByText("Not configured")).toBeInTheDocument();
  });

  it("re-masks WeChat content when Hide is clicked", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);
    await user.click(screen.getByRole("button", { name: /reveal wechat/i }));
    await user.click(screen.getByRole("button", { name: /hide wechat/i }));
    expect(screen.getByRole("button", { name: /reveal wechat/i })).toBeInTheDocument();
  });

  it("renders three article cards", () => {
    render(<ContactSection />);
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });

  it("renders Material Symbols icons for all three cards", () => {
    render(<ContactSection />);
    const icons = document.querySelectorAll(".material-symbols-outlined");
    expect(icons.length).toBeGreaterThanOrEqual(3);
  });

  it("has accessible section landmark", () => {
    render(<ContactSection />);
    expect(screen.getByRole("region", { name: /contact/i })).toBeInTheDocument();
  });
});
