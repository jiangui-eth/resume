import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithIntl } from "@/test/intl-test-utils";
import ContactSection from "../ContactSection";

describe("ContactSection", () => {
  it("renders the section heading (zh-CN)", () => {
    renderWithIntl(<ContactSection />);
    expect(screen.getByText(/共建下一代 Web 产品/)).toBeInTheDocument();
  });

  it("renders the email address visibly", () => {
    renderWithIntl(<ContactSection />);
    expect(screen.getByText("jiangui.eth@gmail.com")).toBeInTheDocument();
  });

  it("email card has a mailto link", () => {
    renderWithIntl(<ContactSection />);
    const link = screen.getByRole("link", { name: /jiangui\.eth@gmail\.com/i });
    expect(link).toHaveAttribute("href", "mailto:jiangui.eth@gmail.com");
  });

  it("renders WeChat and Phone cards with masked content by default", () => {
    renderWithIntl(<ContactSection />);
    const masked = screen.getAllByText("••••••••");
    expect(masked.length).toBeGreaterThanOrEqual(2);
  });

  it("renders Reveal buttons for WeChat and Phone", () => {
    renderWithIntl(<ContactSection />);
    expect(screen.getByRole("button", { name: /reveal wechat/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reveal phone/i })).toBeInTheDocument();
  });

  it("reveals WeChat content and shows Hide button on click", async () => {
    const user = userEvent.setup();
    renderWithIntl(<ContactSection />);
    await user.click(screen.getByRole("button", { name: /reveal wechat/i }));
    expect(screen.getByRole("button", { name: /hide wechat/i })).toBeInTheDocument();
    // zh-CN fallback for empty contact value is "未配置"
    expect(screen.getByText("未配置")).toBeInTheDocument();
  });

  it("re-masks WeChat content when Hide is clicked", async () => {
    const user = userEvent.setup();
    renderWithIntl(<ContactSection />);
    await user.click(screen.getByRole("button", { name: /reveal wechat/i }));
    await user.click(screen.getByRole("button", { name: /hide wechat/i }));
    expect(screen.getByRole("button", { name: /reveal wechat/i })).toBeInTheDocument();
  });

  it("renders three article cards", () => {
    renderWithIntl(<ContactSection />);
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });

  it("has accessible section landmark", () => {
    renderWithIntl(<ContactSection />);
    expect(screen.getByRole("region", { name: /contact/i })).toBeInTheDocument();
  });
});
