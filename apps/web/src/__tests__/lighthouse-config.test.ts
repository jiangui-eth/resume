import { describe, expect, it } from 'vitest'
import config from '../../.lighthouserc.json'

const { collect, assert } = config.ci
const { assertions } = assert

describe('.lighthouserc.json — collect', () => {
  it('targets the homepage', () => {
    expect(collect.url).toContain('http://localhost:3000/')
  })

  it('targets the projects page', () => {
    expect(collect.url).toContain('http://localhost:3000/projects')
  })

  it('runs at least 2 audits per URL', () => {
    expect(collect.numberOfRuns).toBeGreaterThanOrEqual(2)
  })
})

describe('.lighthouserc.json — assert thresholds', () => {
  it('performance score threshold is ≥ 0.9', () => {
    const [severity, opts] = assertions['categories:performance'] as [
      string,
      { minScore: number },
    ]
    expect(severity).toBe('error')
    expect(opts.minScore).toBeGreaterThanOrEqual(0.9)
  })

  it('accessibility score threshold is ≥ 0.85', () => {
    const [severity, opts] = assertions['categories:accessibility'] as [
      string,
      { minScore: number },
    ]
    expect(severity).toBe('error')
    expect(opts.minScore).toBeGreaterThanOrEqual(0.85)
  })

  it('lCP threshold is ≤ 2500ms', () => {
    const [severity, opts] = assertions['audits:largest-contentful-paint'] as [
      string,
      { maxNumericValue: number },
    ]
    expect(severity).toBe('error')
    expect(opts.maxNumericValue).toBeLessThanOrEqual(2500)
  })

  it('all three assertions use \'error\' severity to block PRs', () => {
    for (const [severity] of Object.values(assertions) as [string, unknown][]) {
      expect(severity).toBe('error')
    }
  })
})
