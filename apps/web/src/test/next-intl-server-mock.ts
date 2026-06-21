import type { AbstractIntlMessages } from 'next-intl'
/**
 * Call this inside a vi.mock("next-intl/server", factory) call.
 * Provides getTranslations / getLocale / getMessages backed by zh-CN messages.
 */
import { vi } from 'vitest'
import zhCN from '../../messages/zh-CN.json'

const messages = zhCN as AbstractIntlMessages

function makeT(namespace?: string) {
  return (key: string) => {
    const section = namespace
      ? (messages as Record<string, unknown>)[namespace]
      : messages
    if (!section || typeof section !== 'object')
      return key
    const parts = key.split('.')
    let val: unknown = section
    for (const p of parts) val = (val as Record<string, unknown>)?.[p]
    return (val as string) ?? key
  }
}

export const nextIntlServerMock = {
  getTranslations: vi
    .fn()
    .mockImplementation(async (namespace?: string) => makeT(namespace)),
  getLocale: vi.fn().mockResolvedValue('zh-CN'),
  getMessages: vi.fn().mockResolvedValue(messages),
}
