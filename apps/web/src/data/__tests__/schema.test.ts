import { describe, expect, it } from "vitest";
import contact from "../contact.json";
import experiences from "../experiences.json";
import profile from "../profile.json";
import projects from "../projects.json";
import skills from "../skills.json";

describe("experiences.json schema", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(experiences)).toBe(true);
    expect(experiences.length).toBeGreaterThan(0);
  });

  it("every entry has required fields", () => {
    for (const e of experiences) {
      expect(e).toHaveProperty("id");
      expect(e).toHaveProperty("company");
      expect(e).toHaveProperty("title");
      expect(e).toHaveProperty("period");
      expect(e).toHaveProperty("techTags");
    }
  });

  it("every entry period has start and end", () => {
    for (const e of experiences) {
      expect(e.period).toHaveProperty("start");
      expect(e.period).toHaveProperty("end");
    }
  });
});

describe("projects.json schema", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it("every entry has id, name, order", () => {
    for (const p of projects) {
      expect(p).toHaveProperty("id");
      expect(p).toHaveProperty("name");
      expect(p).toHaveProperty("order");
    }
  });

  it("order values are unique positive integers", () => {
    const orders = projects.map((p) => p.order);
    const unique = new Set(orders);
    expect(unique.size).toBe(orders.length);
    for (const o of orders) {
      expect(o).toBeGreaterThan(0);
    }
  });
});

describe("skills.json schema", () => {
  it("has radarDimensions array with score fields", () => {
    expect(Array.isArray(skills.radarDimensions)).toBe(true);
    expect(skills.radarDimensions.length).toBeGreaterThan(0);
    for (const d of skills.radarDimensions) {
      expect(d).toHaveProperty("label");
      expect(d).toHaveProperty("score");
      expect(d.score).toBeGreaterThanOrEqual(0);
      expect(d.score).toBeLessThanOrEqual(100);
    }
  });

  it("has techCategories array", () => {
    expect(Array.isArray(skills.techCategories)).toBe(true);
    expect(skills.techCategories.length).toBeGreaterThan(0);
  });

  it("has battleTestedCards array", () => {
    expect(Array.isArray(skills.battleTestedCards)).toBe(true);
    expect(skills.battleTestedCards.length).toBeGreaterThan(0);
  });
});

describe("profile.json schema", () => {
  it("has name, headline, summary", () => {
    expect(profile).toHaveProperty("name");
    expect(profile).toHaveProperty("headline");
    expect(profile).toHaveProperty("summary");
  });

  it("has stats object with required fields", () => {
    expect(profile.stats).toHaveProperty("yearsExperience");
    expect(profile.stats).toHaveProperty("projectsShipped");
  });

  it("has a non-empty socials array", () => {
    expect(Array.isArray(profile.socials)).toBe(true);
    expect(profile.socials.length).toBeGreaterThan(0);
  });
});

describe("contact.json schema", () => {
  it("has email and github fields", () => {
    expect(contact).toHaveProperty("email");
    expect(contact).toHaveProperty("github");
  });

  it("email is a valid email-like string", () => {
    expect(contact.email).toMatch(/@/);
  });

  it("github is a URL", () => {
    expect(contact.github).toMatch(/^https?:\/\//);
  });
});
