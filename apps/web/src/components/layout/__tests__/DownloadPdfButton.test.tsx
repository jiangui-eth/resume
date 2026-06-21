import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithIntl } from "@/test/intl-test-utils";
import DownloadPdfButton from "../DownloadPdfButton";

vi.mock("@/lib/analytics", () => ({ track: vi.fn() }));

describe("downloadPdfButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders a link to /resume-preview", () => {
    renderWithIntl(<DownloadPdfButton />);
    const link = screen.getByRole("link", { name: /下载 PDF/ });
    expect(link).toHaveAttribute("href", "/resume-preview");
  });

  it("opens in a new tab", () => {
    renderWithIntl(<DownloadPdfButton />);
    const link = screen.getByRole("link", { name: /下载 PDF/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("fires analytics track on click", async () => {
    const { track } = await import("@/lib/analytics");
    const user = userEvent.setup();
    renderWithIntl(<DownloadPdfButton />);
    await user.click(screen.getByRole("link", { name: /下载 PDF/ }));
    expect(track).toHaveBeenCalledWith("click_download_pdf", {});
  });

  it("applies w-full and justify-center when fullWidth=true", () => {
    renderWithIntl(<DownloadPdfButton fullWidth />);
    const link = screen.getByRole("link", { name: /下载 PDF/ });
    expect(link.className).toContain("w-full");
    expect(link.className).toContain("justify-center");
  });

  it("does NOT apply w-full when fullWidth is omitted", () => {
    renderWithIntl(<DownloadPdfButton />);
    const link = screen.getByRole("link", { name: /下载 PDF/ });
    expect(link.className).not.toContain("w-full");
  });
});
