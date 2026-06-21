import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithIntl } from "@/test/intl-test-utils";

import LanguageSwitcher from "../LanguageSwitcher";

// ── i18n navigation mock ───────────────────────────────────────────────────────

const mockReplace = vi.hoisted(() => vi.fn());

vi.mock("@/i18n/navigation", () => ({
  useRouter: () => ({ replace: mockReplace }),
  usePathname: () => "/",
}));

describe("languageSwitcher", () => {
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
    expect(
      screen.getByRole("option", { name: "简体中文" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "繁體中文" }),
    ).toBeInTheDocument();
  });

  it("calls router.replace with the selected locale", async () => {
    const user = userEvent.setup();
    renderWithIntl(<LanguageSwitcher />);
    await user.click(screen.getByRole("button", { name: /语言/ }));
    await user.click(screen.getByRole("option", { name: "English" }));
    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/", { locale: "en" });
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

  it("does not call router.replace when the current locale is selected", async () => {
    const user = userEvent.setup();
    renderWithIntl(<LanguageSwitcher />);
    await user.click(screen.getByRole("button", { name: /语言/ }));
    await user.click(screen.getByRole("option", { name: "简体中文" }));
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
