import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import profileData from '@/data/profile.json'
import zhCN from '../../../../messages/zh-CN.json'

import HeroSection from '../HeroSection'

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

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

vi.mock('@/lib/analytics', () => ({ track: vi.fn() }))

async function renderSection() {
  const jsx = await HeroSection()
  return render(
    <NextIntlClientProvider locale="zh-CN" messages={zhCN}>
      {jsx}
    </NextIntlClientProvider>,
  )
}

describe('heroSection', () => {
  it('renders the candidate name in the h1', async () => {
    await renderSection()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      profileData.name,
    )
  })

  it('renders the i18n headline badge (zh-CN)', async () => {
    await renderSection()
    expect(screen.getByText('AI 全栈工程师与 Web3 开发者')).toBeInTheDocument()
  })

  it('renders the i18n summary paragraph (zh-CN)', async () => {
    await renderSection()
    expect(screen.getByText(/8 年前端开发经验/)).toBeInTheDocument()
  })

  it('renders a 查看项目 link pointing to /projects', async () => {
    await renderSection()
    const link = screen.getByRole('link', { name: /查看项目/ })
    expect(link).toHaveAttribute('href', '/projects')
  })

  it('renders a 获取联系方式 anchor linking to #contact', async () => {
    await renderSection()
    const link = screen.getByRole('link', { name: /获取联系方式/ })
    expect(link).toHaveAttribute('href', '#contact')
  })

  it('renders the hero section landmark', async () => {
    await renderSection()
    expect(screen.getByRole('region', { name: /hero/i })).toBeInTheDocument()
  })
})
