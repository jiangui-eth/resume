import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ciYml = readFileSync(join(__dirname, "../../../../.github/workflows/ci.yml"), "utf-8");

describe(".github/workflows/ci.yml — required steps", () => {
  it("triggers on pull_request to main", () => {
    expect(ciYml).toContain("pull_request");
    expect(ciYml).toContain("[main]");
  });

  it("includes ESLint step", () => {
    expect(ciYml).toContain("next lint");
  });

  it("includes Prettier format check", () => {
    expect(ciYml).toContain("prettier");
    expect(ciYml).toContain("--check");
  });

  it("includes TypeScript type check", () => {
    expect(ciYml).toContain("tsc --noEmit");
  });

  it("includes unit test step", () => {
    expect(ciYml).toContain("pnpm test --run");
  });

  it("includes production build step", () => {
    expect(ciYml).toContain("pnpm build");
  });

  it("includes Lighthouse CI step", () => {
    expect(ciYml).toContain("lhci autorun");
  });

  it("includes Playwright visual regression step", () => {
    expect(ciYml).toContain("playwright test");
  });

  it("includes link validity check step", () => {
    expect(ciYml).toContain("check-links.mjs");
  });

  it("uploads failure artifacts", () => {
    expect(ciYml).toContain("upload-artifact");
    expect(ciYml).toContain("if: failure()");
  });
});
