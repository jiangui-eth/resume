import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const __dirname = dirname(fileURLToPath(import.meta.url))
const template = readFileSync(
  join(__dirname, '../../../../.github/pull_request_template.md'),
  'utf-8',
)

describe('.github/pull_request_template.md — required sections', () => {
  it('has a Description section', () => {
    expect(template).toContain('## Description')
  })

  it('has a Task section with Task ID field', () => {
    expect(template).toContain('## Task')
    expect(template).toContain('Task ID')
  })

  it('has a Change type section', () => {
    expect(template).toContain('## Change type')
  })

  it('has a Self-check section with lint, tsc, build, test items', () => {
    expect(template).toContain('Self-check')
    expect(template).toContain('lint')
    expect(template).toContain('tsc --noEmit')
    expect(template).toContain('pnpm build')
    expect(template).toContain('pnpm test --run')
  })

  it('self-check includes responsive layout check', () => {
    expect(template).toContain('Responsive')
  })

  it('self-check includes no hardcoded contact info check', () => {
    expect(template).toContain('hardcoded')
  })

  it('has a Preview URL section', () => {
    expect(template).toContain('Preview URL')
  })

  it('has a Screenshots section', () => {
    expect(template).toContain('Screenshots')
  })

  it('has a Code Review checklist for reviewers', () => {
    expect(template).toContain('Code Review checklist')
  })

  it('code review checklist covers no secrets check', () => {
    expect(template).toContain('secrets')
  })

  it('code review checklist covers next/image check', () => {
    expect(template).toContain('next/image')
  })

  it('code review checklist covers no console.log check', () => {
    expect(template).toContain('console.log')
  })
})
