import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { renderWithIntl } from '@/test/intl-test-utils'

import ProjectsCTA from '../ProjectsCTA'

vi.mock('@/lib/analytics', () => ({ track: vi.fn() }))

describe('projectsCTA', () => {
  it('renders the i18n CTA heading (zh-CN: 深入了解技术细节)', () => {
    renderWithIntl(<ProjectsCTA />)
    expect(
      screen.getByRole('heading', { name: /深入了解技术细节/ }),
    ).toBeInTheDocument()
  })

  it('renders the i18n technical interview link (zh-CN: 预约技术交流)', () => {
    renderWithIntl(<ProjectsCTA />)
    expect(
      screen.getByRole('link', { name: /预约技术交流/ }),
    ).toBeInTheDocument()
  })

  it('keeps the technical interview link target unchanged', () => {
    renderWithIntl(<ProjectsCTA />)
    const link = screen.getByRole('link', { name: /预约技术交流/ })
    const href = link.getAttribute('href') ?? ''
    expect(href.startsWith('mailto:') || href.startsWith('/contact')).toBe(
      true,
    )
  })

  it('renders the i18n GitHub link (zh-CN: 查看 GitHub)', () => {
    renderWithIntl(<ProjectsCTA />)
    expect(
      screen.getByRole('link', { name: /查看 GitHub/i }),
    ).toBeInTheDocument()
  })

  it('keeps the GitHub link href unchanged', () => {
    renderWithIntl(<ProjectsCTA />)
    const link = screen.getByRole('link', { name: /查看 GitHub/i })
    expect(link.getAttribute('href')).toMatch(/^https:\/\/github\.com\//)
  })

  it('keeps the GitHub link security attributes unchanged', () => {
    renderWithIntl(<ProjectsCTA />)
    const link = screen.getByRole('link', { name: /查看 GitHub/i })
    expect(link.getAttribute('target')).toBe('_blank')
    expect(link.getAttribute('rel')).toContain('noopener')
  })
})
