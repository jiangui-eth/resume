// Applied via next.config.ts headers() to every route.
// CSP covers browser-loaded resources only (server-side API calls are exempt).
const CSP = [
  'default-src \'self\'',
  // Next.js injects inline hydration scripts; Vercel Analytics loads from CDN
  'script-src \'self\' \'unsafe-inline\' https://vercel-insights-cdn.vercel-scripts.com',
  // Tailwind global styles + Material Symbols sheet from Google Fonts
  'style-src \'self\' \'unsafe-inline\' https://fonts.googleapis.com',
  // Material Symbols / Geist font files
  'font-src \'self\' https://fonts.gstatic.com',
  // Avatar + decorative images from Google CDN
  'img-src \'self\' data: blob: https://lh3.googleusercontent.com',
  // Vercel Analytics beacon + Sentry error reporting
  'connect-src \'self\' https://va.vercel-scripts.com https://*.sentry.io',
  // Prevent this site from being embedded in iframes (clickjacking defence)
  'frame-ancestors \'none\'',
  'base-uri \'self\'',
  'form-action \'self\'',
].join('; ')

export interface SecurityHeader {
  key: string
  value: string
}

export const securityHeaders: SecurityHeader[] = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  { key: 'Content-Security-Policy', value: CSP },
]
