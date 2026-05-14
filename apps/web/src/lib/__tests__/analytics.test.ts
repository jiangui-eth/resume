import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@vercel/analytics/react", () => ({
  track: vi.fn(),
  Analytics: () => null,
}));

import { track } from "../analytics";
import * as va from "@vercel/analytics/react";

describe("analytics", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("exports a track function", () => {
    expect(typeof track).toBe("function");
  });

  it("calls @vercel/analytics track with the event name", () => {
    track("click_download_pdf", {});
    expect(va.track).toHaveBeenCalledWith("click_download_pdf", {});
  });

  it("forwards optional properties to the underlying tracker", () => {
    track("scroll_depth", { depth: 50 });
    expect(va.track).toHaveBeenCalledWith("scroll_depth", { depth: 50 });
  });

  it("works with no properties argument", () => {
    expect(() => track("click_get_in_touch")).not.toThrow();
    expect(va.track).toHaveBeenCalledWith("click_get_in_touch", undefined);
  });
});
