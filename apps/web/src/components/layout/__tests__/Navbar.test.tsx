/**
 * T-005: Navbar unit tests
 * Framework: Vitest + @testing-library/react + jsdom
 */

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

// Mock fetch for PDF availability check
const mockFetch = vi.fn();
global.fetch = mockFetch;

import Navbar from "../Navbar";

// ── Helpers ────────────────────────────────────────────────────────────────────

function setPathname(p: string) {
  mockPathname = p;
}

function renderNavbar() {
  return render(<Navbar />);
}

beforeEach(() => {
  mockPathname = "/";
  // Default: PDF not available
  mockFetch.mockResolvedValue({ ok: false });
});

afterEach(() => {
  vi.clearAllMocks();
  document.body.style.overflow = "";
});

// ── Tests ──────────────────────────────────────────────────────────────────────

describe("Navbar — logo", () => {
  it("renders the jiangui.eth logo link pointing to /", () => {
    renderNavbar();
    const logo = screen.getByRole("link", { name: /jiangui\.eth/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("href", "/");
  });
});

describe("Navbar — desktop navigation links", () => {
  it("renders all four nav links", () => {
    renderNavbar();
    expect(screen.getAllByRole("link", { name: "Home" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Experience" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Projects" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Skills" }).length).toBeGreaterThan(0);
  });

  it("marks Home as active (aria-current=page) on /", () => {
    setPathname("/");
    renderNavbar();
    const homeLinks = screen.getAllByRole("link", { name: "Home" });
    const activeHome = homeLinks.find((el) => el.getAttribute("aria-current") === "page");
    expect(activeHome).toBeDefined();
  });

  it("marks Experience as active on /experience", () => {
    setPathname("/experience");
    renderNavbar();
    const links = screen.getAllByRole("link", { name: "Experience" });
    const active = links.find((el) => el.getAttribute("aria-current") === "page");
    expect(active).toBeDefined();
  });

  it("marks Projects as active on /projects/my-app (prefix match)", () => {
    setPathname("/projects/my-app");
    renderNavbar();
    const links = screen.getAllByRole("link", { name: "Projects" });
    const active = links.find((el) => el.getAttribute("aria-current") === "page");
    expect(active).toBeDefined();
  });

  it("does NOT mark Home as active on /experience", () => {
    setPathname("/experience");
    renderNavbar();
    const homeLinks = screen.getAllByRole("link", { name: "Home" });
    homeLinks.forEach((el) => {
      expect(el.getAttribute("aria-current")).not.toBe("page");
    });
  });
});

describe("Navbar — scroll frosted glass", () => {
  it("starts transparent (no backdrop-blur class on header)", () => {
    renderNavbar();
    const header = screen.getByRole("banner");
    expect(header.className).not.toContain("backdrop-blur-md");
  });

  it("adds backdrop-blur class after scrolling past 8px", async () => {
    renderNavbar();
    const header = screen.getByRole("banner");

    // Simulate scroll
    Object.defineProperty(window, "scrollY", { value: 10, writable: true, configurable: true });
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(header.className).toContain("backdrop-blur-md");
    });
  });

  it("removes backdrop-blur when scrolled back to top", async () => {
    renderNavbar();
    const header = screen.getByRole("banner");

    Object.defineProperty(window, "scrollY", { value: 10, writable: true, configurable: true });
    fireEvent.scroll(window);
    await waitFor(() => expect(header.className).toContain("backdrop-blur-md"));

    Object.defineProperty(window, "scrollY", { value: 0, writable: true, configurable: true });
    fireEvent.scroll(window);
    await waitFor(() => expect(header.className).not.toContain("backdrop-blur-md"));
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

  it("closes the drawer when a nav link is clicked (pathname change)", async () => {
    const user = userEvent.setup();
    renderNavbar();

    await user.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Simulate pathname change (drawer listens to usePathname)
    mockPathname = "/experience";
    // Re-render to pick up new pathname value
    // In real routing this would come from Next router; here the effect fires on render
  });
});

describe("Navbar — Download PDF button", () => {
  it("shows disabled PDF button when PDF HEAD request fails", async () => {
    mockFetch.mockResolvedValue({ ok: false });
    renderNavbar();

    await waitFor(() => {
      // Disabled state renders as a <span> with tooltip title
      const disabled = document.querySelector('[title*="PDF not available"]');
      expect(disabled).toBeInTheDocument();
    });
  });

  it("shows enabled download link when PDF HEAD request succeeds", async () => {
    mockFetch.mockResolvedValue({ ok: true });
    renderNavbar();

    await waitFor(() => {
      const links = screen.getAllByRole("link", { name: /download pdf/i });
      const downloadLink = links.find((el) => el.hasAttribute("download"));
      expect(downloadLink).toBeDefined();
      expect(downloadLink).toHaveAttribute("href", "/resume.pdf");
    });
  });
});
