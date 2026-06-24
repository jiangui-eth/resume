import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";

const tokensDir = resolve(__dirname, "../../../../../packages/ui/src/tokens");

function readToken(filename: string): string {
  return readFileSync(resolve(tokensDir, filename), "utf-8");
}

describe("t-DS-002 Visual Scale Tokens", () => {
  describe("typography.css", () => {
    let css: string;
    beforeAll(() => {
      css = readToken("typography.css");
    });

    it("defines display-large size as 57px", () => {
      expect(css).toContain("--ds-type-display-large-size: 57px");
    });

    it("defines all 15 type scale entries", () => {
      const scales = [
        "display-large",
        "display-medium",
        "display-small",
        "headline-large",
        "headline-medium",
        "headline-small",
        "title-large",
        "title-medium",
        "title-small",
        "body-large",
        "body-medium",
        "body-small",
        "label-large",
        "label-medium",
        "label-small",
      ];
      for (const scale of scales) {
        expect(css).toContain(`--ds-type-${scale}-size:`);
        expect(css).toContain(`--ds-type-${scale}-height:`);
        expect(css).toContain(`--ds-type-${scale}-weight:`);
        expect(css).toContain(`--ds-type-${scale}-tracking:`);
      }
    });

    it("registers --text-display-large in @theme inline", () => {
      expect(css).toContain("@theme inline");
      expect(css).toContain("--text-display-large:");
    });

    it("defines label-small as 11px / 16px / 500 / 0.5px", () => {
      expect(css).toContain("--ds-type-label-small-size: 11px");
      expect(css).toContain("--ds-type-label-small-height: 16px");
      expect(css).toContain("--ds-type-label-small-weight: 500");
      expect(css).toContain("--ds-type-label-small-tracking: 0.5px");
    });
  });

  describe("shape.css", () => {
    let css: string;
    beforeAll(() => {
      css = readToken("shape.css");
    });

    it("defines all 7 shape tokens", () => {
      expect(css).toContain("--ds-shape-none: 0px");
      expect(css).toContain("--ds-shape-extra-small: 4px");
      expect(css).toContain("--ds-shape-small: 8px");
      expect(css).toContain("--ds-shape-medium: 12px");
      expect(css).toContain("--ds-shape-large: 16px");
      expect(css).toContain("--ds-shape-extra-large: 28px");
      expect(css).toContain("--ds-shape-full: 9999px");
    });

    it("uses 9999px for full (not 50%)", () => {
      expect(css).toContain("9999px");
      expect(css).not.toContain("50%");
    });

    it("registers all radius-ds-* utilities in @theme inline", () => {
      expect(css).toContain("--radius-ds-none:");
      expect(css).toContain("--radius-ds-xs:");
      expect(css).toContain("--radius-ds-sm:");
      expect(css).toContain("--radius-ds-md:");
      expect(css).toContain("--radius-ds-lg:");
      expect(css).toContain("--radius-ds-xl:");
      expect(css).toContain("--radius-ds-full:");
    });
  });

  describe("elevation.css", () => {
    let css: string;
    beforeAll(() => {
      css = readToken("elevation.css");
    });

    it("defines --ds-elevation-0 through --ds-elevation-5", () => {
      for (let i = 0; i <= 5; i++) {
        expect(css).toContain(`--ds-elevation-${i}:`);
      }
    });

    it("defines --ds-tint-level-0 through --ds-tint-level-5", () => {
      for (let i = 0; i <= 5; i++) {
        expect(css).toContain(`--ds-tint-level-${i}:`);
      }
    });

    it("defines .elevation-0 through .elevation-5 utility classes", () => {
      for (let i = 0; i <= 5; i++) {
        expect(css).toContain(`.elevation-${i}`);
      }
    });

    it("elevation-0 is none and elevation-1 has box-shadow value", () => {
      expect(css).toContain("--ds-elevation-0: none");
      expect(css).toContain("0px 1px 2px rgba(0, 0, 0, 0.3)");
    });
  });

  describe("motion.css", () => {
    let css: string;
    beforeAll(() => {
      css = readToken("motion.css");
    });

    it("defines all 16 duration tokens", () => {
      const durations = [
        "short-1",
        "short-2",
        "short-3",
        "short-4",
        "medium-1",
        "medium-2",
        "medium-3",
        "medium-4",
        "long-1",
        "long-2",
        "long-3",
        "long-4",
        "extra-long-1",
        "extra-long-2",
        "extra-long-3",
        "extra-long-4",
      ];
      for (const d of durations) {
        expect(css).toContain(`--ds-duration-${d}:`);
      }
    });

    it("defines 5 easing tokens", () => {
      expect(css).toContain("--ds-easing-emphasized-decelerate:");
      expect(css).toContain("--ds-easing-emphasized-accelerate:");
      expect(css).toContain("--ds-easing-standard:");
      expect(css).toContain("--ds-easing-standard-decelerate:");
      expect(css).toContain("--ds-easing-standard-accelerate:");
    });

    it("uses cubic-bezier for easing values", () => {
      expect(css).toContain("cubic-bezier(0.05, 0.7, 0.1, 1)");
      expect(css).toContain("cubic-bezier(0.2, 0, 0, 1)");
    });
  });

  describe("tokens/index.css", () => {
    let css: string;
    beforeAll(() => {
      css = readToken("index.css");
    });

    it("imports typography.css", () => {
      expect(css).toContain('@import "./typography.css"');
    });

    it("imports shape.css", () => {
      expect(css).toContain('@import "./shape.css"');
    });

    it("imports elevation.css", () => {
      expect(css).toContain('@import "./elevation.css"');
    });

    it("imports motion.css", () => {
      expect(css).toContain('@import "./motion.css"');
    });
  });
});
