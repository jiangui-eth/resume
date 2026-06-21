import { describe, expect, it } from "vitest";
import { securityHeaders } from "../security-headers";

function header(key: string) {
  return securityHeaders.find((h) => h.key === key)?.value;
}

describe("securityHeaders", () => {
  it("exports a non-empty array", () => {
    expect(securityHeaders.length).toBeGreaterThan(0);
  });

  it("includes X-Frame-Options: DENY", () => {
    expect(header("X-Frame-Options")).toBe("DENY");
  });

  it("includes X-Content-Type-Options: nosniff", () => {
    expect(header("X-Content-Type-Options")).toBe("nosniff");
  });

  it("includes Referrer-Policy: strict-origin-when-cross-origin", () => {
    expect(header("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
  });

  it("includes Permissions-Policy restricting camera, microphone, geolocation", () => {
    const val = header("Permissions-Policy") ?? "";
    expect(val).toContain("camera=()");
    expect(val).toContain("microphone=()");
    expect(val).toContain("geolocation=()");
  });

  describe("content-Security-Policy", () => {
    const csp = () => header("Content-Security-Policy") ?? "";

    it("sets default-src to self", () => {
      expect(csp()).toContain("default-src 'self'");
    });

    it("allows Google Fonts stylesheet in style-src", () => {
      expect(csp()).toContain("https://fonts.googleapis.com");
    });

    it("allows Google Fonts files in font-src", () => {
      expect(csp()).toContain("https://fonts.gstatic.com");
    });

    it("allows Google CDN images in img-src", () => {
      expect(csp()).toContain("https://lh3.googleusercontent.com");
    });

    it("allows Vercel Analytics beacon in connect-src", () => {
      expect(csp()).toContain("https://va.vercel-scripts.com");
    });

    it("allows Sentry error reporting in connect-src", () => {
      expect(csp()).toContain("https://*.sentry.io");
    });

    it("blocks iframes with frame-ancestors none", () => {
      expect(csp()).toContain("frame-ancestors 'none'");
    });

    it("restricts base-uri to self", () => {
      expect(csp()).toContain("base-uri 'self'");
    });

    it("restricts form-action to self", () => {
      expect(csp()).toContain("form-action 'self'");
    });
  });
});
