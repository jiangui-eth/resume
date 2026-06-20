import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NextIntlClientProvider } from 'next-intl'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import zhCN from '../../../../messages/zh-CN.json'

import ContactSection from '../ContactSection'

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

async function renderSection() {
  const jsx = await ContactSection()
  return render(
    <NextIntlClientProvider locale="zh-CN" messages={zhCN}>
      {jsx}
    </NextIntlClientProvider>,
  )
}

describe('contactSection', () => {
  it('renders the section heading (zh-CN)', async () => {
    await renderSection()
    expect(screen.getByText(/共建下一代 Web 产品/)).toBeInTheDocument()
  })

  it('renders the email address visibly', async () => {
    await renderSection()
    expect(screen.getByText('jiangui.eth@gmail.com')).toBeInTheDocument()
  })

  it('email card has a mailto link', async () => {
    await renderSection()
    const link = screen.getByRole('link', { name: /jiangui\.eth@gmail\.com/i })
    expect(link).toHaveAttribute('href', 'mailto:jiangui.eth@gmail.com')
  })

  it('renders WeChat and Phone cards with masked content by default', async () => {
    await renderSection()
    const masked = screen.getAllByText('••••••••')
    expect(masked.length).toBeGreaterThanOrEqual(2)
  })

  it('renders Reveal buttons for WeChat and Phone', async () => {
    await renderSection()
    expect(
      screen.getByRole('button', { name: /reveal wechat/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /reveal phone/i }),
    ).toBeInTheDocument()
  })

  it('reveals WeChat content and shows Hide button on click', async () => {
    const user = userEvent.setup()
    await renderSection()
    await user.click(screen.getByRole('button', { name: /reveal wechat/i }))
    expect(
      screen.getByRole('button', { name: /hide wechat/i }),
    ).toBeInTheDocument()
    expect(screen.getByText('未配置')).toBeInTheDocument()
  })

  it('re-masks WeChat content when Hide is clicked', async () => {
    const user = userEvent.setup()
    await renderSection()
    await user.click(screen.getByRole('button', { name: /reveal wechat/i }))
    await user.click(screen.getByRole('button', { name: /hide wechat/i }))
    expect(
      screen.getByRole('button', { name: /reveal wechat/i }),
    ).toBeInTheDocument()
  })

  it('renders three article cards', async () => {
    await renderSection()
    expect(screen.getAllByRole('article')).toHaveLength(3)
  })

  it('has accessible section landmark', async () => {
    await renderSection()
    expect(
      screen.getByRole('region', { name: /contact/i }),
    ).toBeInTheDocument()
  })
})
