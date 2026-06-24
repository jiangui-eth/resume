import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";

const tokensDir = resolve(__dirname, "../../../../../packages/ui/src/tokens");

function readToken(filename: string): string {
  return readFileSync(resolve(tokensDir, filename), "utf-8");
}

describe("t-DS-003 State Layer System", () => {
  describe("state.css — CSS vars", () => {
    let css: string;
    beforeAll(() => {
      css = readToken("state.css");
    });

    it("defines all 6 state opacity vars", () => {
      expect(css).toContain("--ds-state-hover:");
      expect(css).toContain("--ds-state-focused:");
      expect(css).toContain("--ds-state-pressed:");
      expect(css).toContain("--ds-state-dragged:");
      expect(css).toContain("--ds-state-disabled-container:");
      expect(css).toContain("--ds-state-disabled-content:");
    });

    it("hover opacity is 0.08", () => {
      expect(css).toContain("--ds-state-hover: 0.08");
    });

    it("focused opacity is 0.1", () => {
      expect(css).toContain("--ds-state-focused: 0.1");
    });

    it("pressed opacity is 0.12", () => {
      expect(css).toContain("--ds-state-pressed: 0.12");
    });

    it("dragged opacity is 0.16", () => {
      expect(css).toContain("--ds-state-dragged: 0.16");
    });

    it("disabled-container is 0.12 and disabled-content is 0.38", () => {
      expect(css).toContain("--ds-state-disabled-container: 0.12");
      expect(css).toContain("--ds-state-disabled-content: 0.38");
    });

    it("registers @theme inline opacity utilities", () => {
      expect(css).toContain("@theme inline");
      expect(css).toContain("--opacity-state-hover:");
      expect(css).toContain("--opacity-state-focused:");
      expect(css).toContain("--opacity-state-pressed:");
    });
  });

  describe("state.css — .state-layer utility", () => {
    let css: string;
    beforeAll(() => {
      css = readToken("state.css");
    });

    it("defines .state-layer with position relative and isolation isolate", () => {
      expect(css).toContain(".state-layer");
      expect(css).toContain("position: relative");
      expect(css).toContain("isolation: isolate");
    });

    it("defines ::before pseudo-element with opacity 0 and pointer-events none", () => {
      expect(css).toContain(".state-layer::before");
      expect(css).toContain("opacity: 0");
      expect(css).toContain("pointer-events: none");
    });

    it("::before uses --state-layer-color with currentColor fallback", () => {
      expect(css).toContain(
        "background: var(--state-layer-color, currentColor)",
      );
    });

    it("::before transition references motion tokens", () => {
      expect(css).toContain("var(--ds-duration-short-2)");
      expect(css).toContain("var(--ds-easing-standard)");
    });

    it("hover rule sets opacity to --ds-state-hover", () => {
      expect(css).toContain(":hover::before");
      expect(css).toContain("opacity: var(--ds-state-hover)");
    });

    it("focus rule sets opacity to --ds-state-focused", () => {
      expect(css).toContain(":focus::before");
      expect(css).toContain("opacity: var(--ds-state-focused)");
    });

    it("active rule sets opacity to --ds-state-pressed", () => {
      expect(css).toContain(":active::before");
      expect(css).toContain("opacity: var(--ds-state-pressed)");
    });

    it("disabled rule sets container opacity to --ds-state-disabled-container", () => {
      expect(css).toContain(":disabled");
      expect(css).toContain("opacity: var(--ds-state-disabled-container)");
    });

    it("disabled child rule uses calc to derive content opacity", () => {
      expect(css).toContain(":disabled > *");
      expect(css).toContain("calc(");
      expect(css).toContain("var(--ds-state-disabled-content)");
    });
  });

  describe("tokens/index.css", () => {
    let css: string;
    beforeAll(() => {
      css = readToken("index.css");
    });

    it("imports state.css", () => {
      expect(css).toContain('@import "./state.css"');
    });
  });
});
