import type { MetadataRoute } from 'next'

const BASE_URL
  = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jiangui-resume.vercel.app'

const ROUTES = ['/', '/experience', '/projects', '/skills']
const LOCALE_PREFIXES = ['', '/en', '/tw'] // "" = zh-CN (default)

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return LOCALE_PREFIXES.flatMap(prefix =>
    ROUTES.map(route => ({
      url: `${BASE_URL}${prefix}${route === '/' && prefix ? '' : route}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: route === '/' ? 1 : 0.8,
    })),
  )
}
