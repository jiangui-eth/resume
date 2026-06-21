import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['zh-CN', 'en', 'zh-TW'],
  defaultLocale: 'zh-CN',
  localePrefix: {
    mode: 'as-needed',
    prefixes: {
      'en': '/en',
      'zh-TW': '/tw',
    },
  },
})

export type Locale = (typeof routing.locales)[number]
