import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tokensDir = resolve(__dirname, "../../../../../packages/ui/src/tokens");

const refCss = readFileSync(resolve(tokensDir, "colors-reference.css"), "utf8");
const lightCss = readFileSync(resolve(tokensDir, "colors-light.css"), "utf8");
const darkCss = readFileSync(resolve(tokensDir, "colors-dark.css"), "utf8");

describe("colors-reference.css", () => {
  const families = [
    "primary",
    "secondary",
    "tertiary",
    "error",
    "neutral",
    "neutral-variant",
  ];
  const tones = [
    "0",
    "10",
    "20",
    "30",
    "40",
    "50",
    "60",
    "70",
    "80",
    "90",
    "95",
    "99",
    "100",
  ];

  it("defines all 6 palette families", () => {
    for (const family of families) {
      expect(refCss).toContain(`--ds-ref-${family}-`);
    }
  });

  it("defines all 13 tones for primary palette", () => {
    for (const tone of tones) {
      expect(refCss).toContain(`--ds-ref-primary-${tone}:`);
    }
  });

  it("defines all 13 tones for neutral-variant palette", () => {
    for (const tone of tones) {
      expect(refCss).toContain(`--ds-ref-neutral-variant-${tone}:`);
    }
  });
});

describe("colors-light.css", () => {
  const systemRoles = [
    "primary",
    "on-primary",
    "primary-container",
    "on-primary-container",
    "secondary",
    "on-secondary",
    "secondary-container",
    "on-secondary-container",
    "tertiary",
    "on-tertiary",
    "tertiary-container",
    "on-tertiary-container",
    "error",
    "on-error",
    "error-container",
    "on-error-container",
    "background",
    "on-background",
    "surface",
    "on-surface",
    "surface-variant",
    "on-surface-variant",
    "surface-dim",
    "surface-bright",
    "surface-container-lowest",
    "surface-container-low",
    "surface-container",
    "surface-container-high",
    "surface-container-highest",
    "inverse-surface",
    "inverse-on-surface",
    "inverse-primary",
    "outline",
    "outline-variant",
    "scrim",
    "shadow",
  ];

  it("defines all 36 system role tokens", () => {
    for (const role of systemRoles) {
      expect(lightCss).toContain(`--ds-color-${role}:`);
    }
  });

  it("applies to :root selector", () => {
    expect(lightCss).toContain(":root");
  });
});

describe("colors-dark.css", () => {
  it("defines dark variants for primary color family", () => {
    expect(darkCss).toContain("--ds-color-primary:");
    expect(darkCss).toContain("--ds-color-on-primary:");
    expect(darkCss).toContain("--ds-color-primary-container:");
  });

  it("defines dark surface tokens", () => {
    expect(darkCss).toContain("--ds-color-surface:");
    expect(darkCss).toContain("--ds-color-surface-dim:");
    expect(darkCss).toContain("--ds-color-surface-container-highest:");
  });

  it("applies to .dark selector", () => {
    expect(darkCss).toContain(".dark");
  });

  it("has different primary value from light (tone 80 vs tone 40)", () => {
    expect(darkCss).toContain("var(--ds-ref-primary-80)");
    expect(lightCss).toContain("var(--ds-ref-primary-40)");
  });
});
