import { describe, it, expect } from "vitest";
import config from "../../vercel.json";

describe("vercel.json — project configuration", () => {
  it("targets the nextjs framework", () => {
    expect(config.framework).toBe("nextjs");
  });

  it("installCommand runs from the monorepo root", () => {
    expect(config.installCommand).toContain("cd ../..");
    expect(config.installCommand).toContain("pnpm install");
  });

  it("buildCommand is pnpm build", () => {
    expect(config.buildCommand).toBe("pnpm build");
  });

  it("outputDirectory is .next", () => {
    expect(config.outputDirectory).toBe(".next");
  });

  it("sets NEXT_PUBLIC_ENV for production", () => {
    expect(config.env.NEXT_PUBLIC_ENV).toBeDefined();
    expect(typeof config.env.NEXT_PUBLIC_ENV).toBe("string");
  });
});

describe("vercel.json — security headers", () => {
  const allHeaders = config.headers.flatMap((rule) => rule.headers);
  const get = (key: string) => allHeaders.find((h) => h.key === key)?.value;

  it("applies headers to all routes", () => {
    expect(config.headers[0]?.source).toBe("/(.*)");
  });

  it("sets HSTS with long max-age and includeSubDomains", () => {
    const hsts = get("Strict-Transport-Security");
    expect(hsts).toContain("max-age=");
    expect(hsts).toContain("includeSubDomains");
  });

  it("sets X-Content-Type-Options to nosniff", () => {
    expect(get("X-Content-Type-Options")).toBe("nosniff");
  });

  it("sets X-Frame-Options to DENY", () => {
    expect(get("X-Frame-Options")).toBe("DENY");
  });

  it("sets Referrer-Policy", () => {
    expect(get("Referrer-Policy")).toBeTruthy();
  });

  it("sets Permissions-Policy", () => {
    expect(get("Permissions-Policy")).toBeTruthy();
  });
});
