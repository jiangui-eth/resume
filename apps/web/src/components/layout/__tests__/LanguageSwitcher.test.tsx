import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithIntl } from "@/test/intl-test-utils";

vi.mock("@/i18n/actions", () => ({
  setLocale: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
  usePathname: () => "/",
}));

import LanguageSwitcher from "../LanguageSwitcher";

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the language toggle button", () => {
    renderWithIntl(<LanguageSwitcher />);
    expect(screen.getByRole("button", { name: /语言/ })).toBeInTheDocument();
  });

  it("does not show the dropdown by default", () => {
    renderWithIntl(<LanguageSwitcher />);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("opens the dropdown when the button is clicked", async () => {
    const user = userEvent.setup();
    renderWithIntl(<LanguageSwitcher />);
    await user.click(screen.getByRole("button", { name: /语言/ }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("shows all three locale options in the dropdown", async () => {
    const user = userEvent.setup();
    renderWithIntl(<LanguageSwitcher />);
    await user.click(screen.getByRole("button", { name: /语言/ }));
    expect(screen.getByRole("option", { name: "English" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "简体中文" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "繁體中文" })).toBeInTheDocument();
  });

  it("calls setLocale when a different locale is selected", async () => {
    const { setLocale } = await import("@/i18n/actions");
    const user = userEvent.setup();
    renderWithIntl(<LanguageSwitcher />);
    await user.click(screen.getByRole("button", { name: /语言/ }));
    await user.click(screen.getByRole("option", { name: "English" }));
    await waitFor(() => {
      expect(setLocale).toHaveBeenCalledWith("en");
    });
  });

  it("closes the dropdown after selecting a locale", async () => {
    const user = userEvent.setup();
    renderWithIntl(<LanguageSwitcher />);
    await user.click(screen.getByRole("button", { name: /语言/ }));
    await user.click(screen.getByRole("option", { name: "English" }));
    await waitFor(() => {
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  it("does not call setLocale when the current locale is selected", async () => {
    const { setLocale } = await import("@/i18n/actions");
    const user = userEvent.setup();
    renderWithIntl(<LanguageSwitcher />);
    await user.click(screen.getByRole("button", { name: /语言/ }));
    await user.click(screen.getByRole("option", { name: "简体中文" }));
    expect(setLocale).not.toHaveBeenCalled();
  });
});
