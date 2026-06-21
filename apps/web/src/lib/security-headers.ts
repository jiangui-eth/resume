// Applied via next.config.ts headers() to every route.
// CSP covers browser-loaded resources only (server-side API calls are exempt).

// React dev mode needs eval() to reconstruct call stacks from different environments.
// Never include unsafe-eval in production.
const isDev = process.env.NODE_ENV === "development";

const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  isDev ? "'unsafe-eval'" : null,
  "https://vercel-insights-cdn.vercel-scripts.com",
]
  .filter(Boolean)
  .join(" ");

const CSP = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  // Tailwind global styles + Material Symbols sheet from Google Fonts
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  // Material Symbols / Geist font files
  "font-src 'self' https://fonts.gstatic.com",
  // Avatar + decorative images from Google CDN
  "img-src 'self' data: blob: https://lh3.googleusercontent.com",
  // Vercel Analytics beacon + Sentry error reporting
  "connect-src 'self' https://va.vercel-scripts.com https://*.sentry.io",
  // Prevent this site from being embedded in iframes (clickjacking defence)
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

export interface SecurityHeader {
  key: string;
  value: string;
}

export const securityHeaders: SecurityHeader[] = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  { key: "Content-Security-Policy", value: CSP },
];
