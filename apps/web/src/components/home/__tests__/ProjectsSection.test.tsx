import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import zhCN from '../../../../messages/zh-CN.json'

import ProjectsSection from '../ProjectsSection'

vi.mock('next-intl/server', async () => {
  const { default: msgs } = await import('../../../../messages/zh-CN.json')
  function makeT(ns?: string) {
    return (key: string) => {
      const section = ns
        ? (msgs as unknown as Record<string, Record<string, string>>)[ns]
        : (msgs as unknown as Record<string, string>)
      if (!section)
        return key
      const parts = key.split('.')
      let val: unknown = section
      for (const p of parts) val = (val as Record<string, unknown>)?.[p]
      return (val as string) ?? key
    }
  }
  return {
    getTranslations: vi
      .fn()
      .mockImplementation(async (ns?: string) => makeT(ns)),
    getLocale: vi.fn().mockResolvedValue('zh-CN'),
    getMessages: vi.fn().mockResolvedValue(msgs),
  }
})

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
  }: {
    src: string
    alt: string
    [key: string]: unknown
  }) => <img src={src} alt={alt} data-testid="project-image" />,
}))

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string
    children: React.ReactNode
    [key: string]: unknown
  }) => (
    <a href={href as string} {...props}>
      {children}
    </a>
  ),
}))

async function renderSection() {
  const jsx = await ProjectsSection()
  return render(
    <NextIntlClientProvider locale="zh-CN" messages={zhCN}>
      {jsx}
    </NextIntlClientProvider>,
  )
}

describe('projectsSection', () => {
  it('renders the "精选项目" heading (zh-CN)', async () => {
    await renderSection()
    expect(screen.getByText('精选项目')).toBeInTheDocument()
  })

  it('renders the "查看全部项目" link pointing to /projects', async () => {
    await renderSection()
    const link = screen.getByRole('link', { name: /查看全部项目/ })
    expect(link).toHaveAttribute('href', '/projects')
  })

  it('renders top 2 featured project names (sorted by order)', async () => {
    await renderSection()
    expect(screen.getByText('Wind Power RAG Platform')).toBeInTheDocument()
    expect(
      screen.getByText('Gate.com SEO Special Project'),
    ).toBeInTheDocument()
  })

  it('renders project taglines', async () => {
    await renderSection()
    expect(
      screen.getByText(
        /Enterprise RAG knowledge platform for wind-power customer service/i,
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Performance-first SEO architecture/i),
    ).toBeInTheDocument()
  })

  it('renders tech tag pills for both projects', async () => {
    await renderSection()
    expect(screen.getAllByText('Next.js').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('React').length).toBeGreaterThanOrEqual(1)
  })

  it('renders two "案例详情" links both pointing to /projects', async () => {
    await renderSection()
    const links = screen.getAllByRole('link', { name: /案例详情/ })
    expect(links).toHaveLength(2)
    links.forEach(link => expect(link).toHaveAttribute('href', '/projects'))
  })

  it('renders two article elements (one per project row)', async () => {
    await renderSection()
    expect(screen.getAllByRole('article')).toHaveLength(2)
  })

  it('has accessible section landmark with i18n label "精选项目"', async () => {
    await renderSection()
    expect(
      screen.getByRole('region', { name: /精选项目/ }),
    ).toBeInTheDocument()
  })
})
