import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithIntl } from "@/test/intl-test-utils";

// ── Module mocks ───────────────────────────────────────────────────────────────

vi.mock("@/lib/analytics", () => ({ track: vi.fn() }));
vi.mock("@/i18n/actions", () => ({ setLocale: vi.fn().mockResolvedValue(undefined) }));

// ── Next.js mocks ──────────────────────────────────────────────────────────────

let mockPathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
  useRouter: () => ({ refresh: vi.fn() }),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import Navbar from "../Navbar";

function setPathname(p: string) {
  mockPathname = p;
}

function renderNavbar() {
  return renderWithIntl(<Navbar />);
}

beforeEach(() => {
  mockPathname = "/";
});

afterEach(() => {
  vi.clearAllMocks();
  document.body.style.overflow = "";
});

// ── Tests ──────────────────────────────────────────────────────────────────────

describe("Navbar — logo", () => {
  it("renders the logo link pointing to /", () => {
    renderNavbar();
    const logo = screen.getByRole("link", { name: /go to homepage/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("href", "/");
  });
});

describe("Navbar — desktop navigation links", () => {
  it("renders all four nav links (zh-CN)", () => {
    renderNavbar();
    expect(screen.getAllByRole("link", { name: "首页" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "经历" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "项目" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "技能" }).length).toBeGreaterThan(0);
  });

  it("marks 首页 as active on /", () => {
    setPathname("/");
    renderNavbar();
    const homeLinks = screen.getAllByRole("link", { name: "首页" });
    const activeHome = homeLinks.find((el) => el.getAttribute("aria-current") === "page");
    expect(activeHome).toBeDefined();
  });

  it("marks 经历 as active on /experience", () => {
    setPathname("/experience");
    renderNavbar();
    const links = screen.getAllByRole("link", { name: "经历" });
    const active = links.find((el) => el.getAttribute("aria-current") === "page");
    expect(active).toBeDefined();
  });

  it("marks 项目 as active on /projects/my-app (prefix match)", () => {
    setPathname("/projects/my-app");
    renderNavbar();
    const links = screen.getAllByRole("link", { name: "项目" });
    const active = links.find((el) => el.getAttribute("aria-current") === "page");
    expect(active).toBeDefined();
  });

  it("does NOT mark 首页 as active on /experience", () => {
    setPathname("/experience");
    renderNavbar();
    const homeLinks = screen.getAllByRole("link", { name: "首页" });
    homeLinks.forEach((el) => {
      expect(el.getAttribute("aria-current")).not.toBe("page");
    });
  });
});

describe("Navbar — scroll frosted glass", () => {
  it("adds backdrop-blur class after scrolling past 8px", async () => {
    renderNavbar();
    const header = screen.getByRole("banner");
    Object.defineProperty(window, "scrollY", { value: 10, writable: true, configurable: true });
    fireEvent.scroll(window);
    await waitFor(() => {
      expect(header.className).toContain("backdrop-blur");
    });
  });
});

describe("Navbar — mobile hamburger drawer", () => {
  it("shows hamburger button on mobile", () => {
    renderNavbar();
    // zh-CN aria-label is "打开菜单"
    expect(screen.getByRole("button", { name: /打开菜单/ })).toBeInTheDocument();
  });

  it("opens the drawer when hamburger is clicked", async () => {
    const user = userEvent.setup();
    renderNavbar();
    await user.click(screen.getByRole("button", { name: /打开菜单/ }));
    expect(screen.getByRole("button", { name: /关闭菜单/ })).toBeInTheDocument();
    expect(screen.getByRole("dialog", { name: /导航菜单/ })).toBeInTheDocument();
  });

  it("locks body scroll when drawer is open", async () => {
    const user = userEvent.setup();
    renderNavbar();
    await user.click(screen.getByRole("button", { name: /打开菜单/ }));
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores body scroll when drawer is closed", async () => {
    const user = userEvent.setup();
    renderNavbar();
    await user.click(screen.getByRole("button", { name: /打开菜单/ }));
    await user.click(screen.getByRole("button", { name: /关闭菜单/ }));
    expect(document.body.style.overflow).toBe("");
  });
});

describe("Navbar — Download PDF button", () => {
  it("renders 下载 PDF link pointing to /resume-preview", () => {
    renderNavbar();
    const links = screen.getAllByRole("link", { name: /下载 PDF/ });
    const previewLink = links.find((el) => el.getAttribute("href") === "/resume-preview");
    expect(previewLink).toBeDefined();
    expect(previewLink).toHaveAttribute("target", "_blank");
  });
});

describe("Navbar — LanguageSwitcher", () => {
  it("renders at least one language switcher button (desktop + mobile)", () => {
    renderNavbar();
    // LanguageSwitcher appears in both desktop CTA and mobile drawer
    expect(screen.getAllByRole("button", { name: /语言/ }).length).toBeGreaterThanOrEqual(1);
  });
});
