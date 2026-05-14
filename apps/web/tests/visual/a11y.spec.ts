import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES = [
  { name: "home", path: "/" },
  { name: "experience", path: "/experience" },
  { name: "projects", path: "/projects" },
  { name: "skills", path: "/skills" },
];

for (const { name, path } of PAGES) {
  test(`${name} page — axe WCAG 2.1 AA`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(results.violations).toEqual([]);
  });
}
