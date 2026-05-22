import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

let mockPathname = "/";

vi.mock("@/i18n/navigation", () => ({
  usePathname: () => mockPathname,
}));

import { useNavbar } from "../useNavbar";

beforeEach(() => {
  mockPathname = "/";
  document.body.style.overflow = "";
});

afterEach(() => {
  vi.clearAllMocks();
  document.body.style.overflow = "";
});

describe("useNavbar — initial state", () => {
  it("initialises with scrolled=false and mobileOpen=false", () => {
    const { result } = renderHook(() => useNavbar());
    expect(result.current.scrolled).toBe(false);
    expect(result.current.mobileOpen).toBe(false);
  });

  it("exposes the current pathname", () => {
    mockPathname = "/experience";
    const { result } = renderHook(() => useNavbar());
    expect(result.current.pathname).toBe("/experience");
  });
});

describe("useNavbar — scroll detection", () => {
  it("sets scrolled=true when scrollY > 8", () => {
    const { result } = renderHook(() => useNavbar());
    act(() => {
      Object.defineProperty(window, "scrollY", {
        value: 9,
        writable: true,
        configurable: true,
      });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(result.current.scrolled).toBe(true);
  });

  it("keeps scrolled=false when scrollY <= 8", () => {
    const { result } = renderHook(() => useNavbar());
    act(() => {
      Object.defineProperty(window, "scrollY", {
        value: 8,
        writable: true,
        configurable: true,
      });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(result.current.scrolled).toBe(false);
  });
});

describe("useNavbar — body scroll lock", () => {
  it("locks body scroll when mobileOpen=true", () => {
    const { result } = renderHook(() => useNavbar());
    act(() => {
      result.current.setMobileOpen(true);
    });
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores body scroll when mobileOpen goes false", () => {
    const { result } = renderHook(() => useNavbar());
    act(() => {
      result.current.setMobileOpen(true);
    });
    act(() => {
      result.current.setMobileOpen(false);
    });
    expect(document.body.style.overflow).toBe("");
  });
});

describe("useNavbar — route change", () => {
  it("closes mobile menu on pathname change", () => {
    const { result, rerender } = renderHook(() => useNavbar());
    act(() => {
      result.current.setMobileOpen(true);
    });
    expect(result.current.mobileOpen).toBe(true);
    mockPathname = "/skills";
    rerender();
    expect(result.current.mobileOpen).toBe(false);
  });
});
