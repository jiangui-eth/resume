import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// ── Module mocks ───────────────────────────────────────────────────────────────

vi.mock("@/lib/analytics", () => ({ track: vi.fn() }));

// ── Next.js mocks ──────────────────────────────────────────────────────────────

let mockPathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
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

const mockFetch = vi.fn();
global.fetch = mockFetch;

import Navbar from "../Navbar";

function setPathname(p: string) {
  mockPathname = p;
}

function renderNavbar() {
  return render(<Navbar />);
}

beforeEach(() => {
  mockPathname = "/";
  mockFetch.mockResolvedValue({ ok: false });
});

afterEach(() => {
  vi.clearAllMocks();
  document.body.style.overflow = "";
});

// ── Tests ──────────────────────────────────────────────────────────────────────

describe("Navbar — logo", () => {
  it("renders the DevArchitect logo link pointing to /", () => {
    renderNavbar();
    const logo = screen.getByRole("link", { name: /go to homepage/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("href", "/");
  });
});

describe("Navbar — desktop navigation links", () => {
  it("renders all four nav links", () => {
    renderNavbar();
    expect(screen.getAllByRole("link", { name: "首页" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "经历" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "项目" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "技能" }).length).toBeGreaterThan(0);
  });

  it("marks 首页 as active (aria-current=page) on /", () => {
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
  it("shows hamburger button on mobile (aria-label Open menu)", () => {
    renderNavbar();
    expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
  });

  it("opens the drawer when hamburger is clicked", async () => {
    const user = userEvent.setup();
    renderNavbar();
    const hamburger = screen.getByRole("button", { name: /open menu/i });
    await user.click(hamburger);
    expect(screen.getByRole("button", { name: /close menu/i })).toBeInTheDocument();
    expect(screen.getByRole("dialog", { name: /navigation menu/i })).toBeInTheDocument();
  });

  it("locks body scroll when drawer is open", async () => {
    const user = userEvent.setup();
    renderNavbar();
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores body scroll when drawer is closed", async () => {
    const user = userEvent.setup();
    renderNavbar();
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    await user.click(screen.getByRole("button", { name: /close menu/i }));
    expect(document.body.style.overflow).toBe("");
  });
});

describe("Navbar — Download PDF button", () => {
  it("renders a 下载 PDF link pointing to /resume-preview", () => {
    renderNavbar();
    const links = screen.getAllByRole("link", { name: /下载 PDF/ });
    const previewLink = links.find(
      (el) => el.getAttribute("href") === "/resume-preview"
    );
    expect(previewLink).toBeDefined();
    expect(previewLink).toHaveAttribute("target", "_blank");
    expect(previewLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not use a download attribute on the PDF link", () => {
    renderNavbar();
    const links = screen.getAllByRole("link", { name: /下载 PDF/ });
    links.forEach((link) => {
      expect(link).not.toHaveAttribute("download");
    });
  });
});
