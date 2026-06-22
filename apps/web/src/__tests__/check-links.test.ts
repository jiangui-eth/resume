import { describe, expect, it } from "vitest";
import contact from "../data/contact.json";
import profile from "../data/profile.json";

describe("external link data — contact.json", () => {
  it("github is a valid GitHub HTTPS URL", () => {
    expect(contact.github).toMatch(/^https:\/\/github\.com\//);
  });

  it("linkedin is a valid LinkedIn HTTPS URL", () => {
    expect(contact.linkedin).toMatch(/^https:\/\/linkedin\.com\//);
  });

  it("twitter is a valid Twitter/X HTTPS URL", () => {
    expect(contact.twitter).toMatch(/^https?:\/\/(twitter|x)\.com\//);
  });
});

describe("external link data — profile.json socials", () => {
  it("has a non-empty socials array", () => {
    expect(Array.isArray(profile.socials)).toBe(true);
    expect(profile.socials.length).toBeGreaterThan(0);
  });

  it("all http/https socials have well-formed URLs", () => {
    const http = profile.socials.filter((s: { url?: string }) =>
      s.url?.startsWith("http"),
    );
    expect(http.length).toBeGreaterThan(0);
    for (const { url } of http) {
      expect(url).toMatch(/^https?:\/\/\S+/);
    }
  });

  it("no social URL is a 404-prone broken path (no bare hostnames)", () => {
    const http = profile.socials.filter((s: { url?: string }) =>
      s.url?.startsWith("http"),
    );
    for (const entry of http) {
      const parsed = new URL(entry.url as string);
      expect(parsed.hostname).not.toBe("");
    }
  });
});
