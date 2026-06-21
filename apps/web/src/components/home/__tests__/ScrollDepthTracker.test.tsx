import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ScrollDepthTracker from "../ScrollDepthTracker";

vi.mock("@/lib/analytics", () => ({ track: vi.fn() }));

const observeMock = vi.fn();
const disconnectMock = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  globalThis.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: observeMock,
    disconnect: disconnectMock,
    unobserve: vi.fn(),
  }));
});

describe("scrollDepthTracker", () => {
  it("renders without crashing", () => {
    expect(() => render(<ScrollDepthTracker />)).not.toThrow();
  });

  it("renders 4 sentinel divs with data-depth attributes", () => {
    const { container } = render(<ScrollDepthTracker />);
    const sentinels = container.querySelectorAll("[data-depth]");
    expect(sentinels.length).toBe(4);
  });

  it("sentinel divs have depths 25, 50, 75, 100", () => {
    const { container } = render(<ScrollDepthTracker />);
    const depths = Array.from(container.querySelectorAll("[data-depth]")).map(
      (el) => Number((el as HTMLElement).dataset.depth),
    );
    expect(depths).toEqual([25, 50, 75, 100]);
  });

  it("creates an IntersectionObserver on mount", () => {
    render(<ScrollDepthTracker />);
    expect(globalThis.IntersectionObserver).toHaveBeenCalled();
    expect(observeMock).toHaveBeenCalledTimes(4);
  });
});
