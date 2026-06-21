import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: [
    // Match all pathnames except static assets, api routes, and special-purpose pages
    '/((?!api|_next/static|_next/image|resume-preview|print|favicon\\.ico|.*\\..*).*)?',
  ],
}
