import { describe, it, expect } from "vitest";
import sitemap from "../sitemap";

describe("sitemap", () => {
  it("returns an array with at least 4 entries", () => {
    const entries = sitemap();
    expect(entries.length).toBeGreaterThanOrEqual(4);
  });

  it("every entry has a url starting with 'https://'", () => {
    const entries = sitemap();
    for (const entry of entries) {
      expect(entry.url).toMatch(/^https:\/\//);
    }
  });

  it("every entry has a lastModified Date", () => {
    const entries = sitemap();
    for (const entry of entries) {
      expect(entry.lastModified).toBeInstanceOf(Date);
    }
  });

  it("includes the root url entry", () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls.some((u) => u.endsWith("/"))).toBe(true);
  });

  it("includes /experience, /projects, /skills entries", () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls.some((u) => u.includes("/experience"))).toBe(true);
    expect(urls.some((u) => u.includes("/projects"))).toBe(true);
    expect(urls.some((u) => u.includes("/skills"))).toBe(true);
  });

  it("does NOT include /print (noindex)", () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls.some((u) => u.includes("/print"))).toBe(false);
  });
});
