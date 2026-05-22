import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import DownloadPdfButton from "../DownloadPdfButton";

vi.mock("@/lib/analytics", () => ({ track: vi.fn() }));

describe("DownloadPdfButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders a link to /resume-preview", () => {
    render(<DownloadPdfButton />);
    const link = screen.getByRole("link", { name: /下载 PDF/ });
    expect(link).toHaveAttribute("href", "/resume-preview");
  });

  it("opens in a new tab", () => {
    render(<DownloadPdfButton />);
    const link = screen.getByRole("link", { name: /下载 PDF/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("fires analytics track on click", async () => {
    const { track } = await import("@/lib/analytics");
    const user = userEvent.setup();
    render(<DownloadPdfButton />);
    await user.click(screen.getByRole("link", { name: /下载 PDF/ }));
    expect(track).toHaveBeenCalledWith("click_download_pdf", {});
  });

  it("applies w-full and justify-center when fullWidth=true", () => {
    render(<DownloadPdfButton fullWidth />);
    const link = screen.getByRole("link", { name: /下载 PDF/ });
    expect(link.className).toContain("w-full");
    expect(link.className).toContain("justify-center");
  });

  it("does NOT apply w-full when fullWidth is omitted", () => {
    render(<DownloadPdfButton />);
    const link = screen.getByRole("link", { name: /下载 PDF/ });
    expect(link.className).not.toContain("w-full");
  });
});
