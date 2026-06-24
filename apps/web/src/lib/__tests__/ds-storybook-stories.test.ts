import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const storiesDir = resolve(
  __dirname,
  "../../../../../apps/storybook/src/stories",
);

function storyExists(relPath: string): boolean {
  return existsSync(resolve(storiesDir, relPath));
}

describe("t-DS-005 Storybook Stories", () => {
  describe("dS component stories", () => {
    it("dSButton.stories.tsx exists", () => {
      expect(storyExists("DSButton.stories.tsx")).toBe(true);
    });

    it("dSInput.stories.tsx exists", () => {
      expect(storyExists("DSInput.stories.tsx")).toBe(true);
    });

    it("dSCard.stories.tsx exists", () => {
      expect(storyExists("DSCard.stories.tsx")).toBe(true);
    });

    it("dSChip.stories.tsx exists", () => {
      expect(storyExists("DSChip.stories.tsx")).toBe(true);
    });

    it("dSDialog.stories.tsx exists", () => {
      expect(storyExists("DSDialog.stories.tsx")).toBe(true);
    });

    it("dSSnackbar.stories.tsx exists", () => {
      expect(storyExists("DSSnackbar.stories.tsx")).toBe(true);
    });
  });

  describe("token overview stories", () => {
    it("tokens/ColorTokens.stories.tsx exists", () => {
      expect(storyExists("tokens/ColorTokens.stories.tsx")).toBe(true);
    });

    it("tokens/TypeScale.stories.tsx exists", () => {
      expect(storyExists("tokens/TypeScale.stories.tsx")).toBe(true);
    });

    it("tokens/ShapeScale.stories.tsx exists", () => {
      expect(storyExists("tokens/ShapeScale.stories.tsx")).toBe(true);
    });

    it("tokens/Elevation.stories.tsx exists", () => {
      expect(storyExists("tokens/Elevation.stories.tsx")).toBe(true);
    });

    it("tokens/MotionTokens.stories.tsx exists", () => {
      expect(storyExists("tokens/MotionTokens.stories.tsx")).toBe(true);
    });
  });

  describe("storybook config", () => {
    const configDir = resolve(
      __dirname,
      "../../../../../apps/storybook/.storybook",
    );

    it("preview.tsx exists", () => {
      expect(existsSync(resolve(configDir, "preview.tsx"))).toBe(true);
    });

    it("preview.tsx imports addon-themes withThemeByDataAttribute", () => {
      const content = readFileSync(resolve(configDir, "preview.tsx"), "utf-8");
      expect(content).toContain("withThemeByDataAttribute");
      expect(content).toContain("data-theme");
    });
  });
});
