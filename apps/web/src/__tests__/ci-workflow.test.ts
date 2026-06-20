import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ciYml = readFileSync(
  join(__dirname, '../../../../.github/workflows/ci.yml'),
  'utf-8',
)

describe('.github/workflows/ci.yml — required jobs', () => {
  it('triggers on pull_request to main or dev_v2', () => {
    expect(ciYml).toContain('pull_request')
    expect(ciYml).toContain('main')
    expect(ciYml).toContain('dev_v2')
  })

  it('includes commit-lint job', () => {
    expect(ciYml).toContain('commit-lint')
  })

  it('includes lint and format check job', () => {
    expect(ciYml).toContain('pnpm lint')
    expect(ciYml).toContain('format:check')
  })

  it('includes Prettier format check', () => {
    expect(ciYml).toContain('format:check')
  })

  it('includes TypeScript type check job', () => {
    expect(ciYml).toContain('check-types')
  })

  it('includes unit test job', () => {
    expect(ciYml).toContain('pnpm --filter web test')
  })

  it('includes production build step', () => {
    expect(ciYml).toContain('pnpm build')
  })

  it('includes Playwright E2E job', () => {
    expect(ciYml).toContain('e2e')
    expect(ciYml).toContain('playwright install')
  })

  it('uploads failure artifacts', () => {
    expect(ciYml).toContain('upload-artifact')
    expect(ciYml).toContain('if: failure()')
  })
})
