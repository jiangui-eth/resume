import { expect, test } from '@playwright/test'

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'experience', path: '/experience' },
  { name: 'projects', path: '/projects' },
  { name: 'skills', path: '/skills' },
  { name: 'print', path: '/print' },
]

for (const { name, path } of PAGES) {
  test(`${name} page — visual snapshot`, async ({
    page,
    browserName: _browserName,
  }, testInfo) => {
    await page.goto(path)
    await page.waitForLoadState('networkidle')

    const viewport = testInfo.project.name
    await expect(page).toHaveScreenshot(`${name}-${viewport}.png`, {
      fullPage: true,
      animations: 'disabled',
      maxDiffPixelRatio: 0.02,
    })
  })
}
