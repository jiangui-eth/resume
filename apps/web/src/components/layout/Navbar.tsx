'use client'

import type { JSX } from 'react'

import { cn } from '@jiangui-resume/ui/lib/utils'
import { useTranslations } from 'next-intl'
import { useNavbar } from '@/hooks/useNavbar'
import { Link } from '@/i18n/navigation'
import DownloadPdfButton from './DownloadPdfButton'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar(): JSX.Element {
  const { scrolled, mobileOpen, setMobileOpen, pathname } = useNavbar()
  const t = useTranslations('nav')

  const NAV_LINKS = [
    { href: '/', label: t('home') },
    { href: '/experience', label: t('experience') },
    { href: '/projects', label: t('projects') },
    { href: '/skills', label: t('skills') },
  ] as { href: string, label: string }[]

  return (
    <header
      className={cn(
        'fixed top-0 left-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-[#444748]/20 bg-[#121414]/80 backdrop-blur-md'
          : 'border-b border-[#444748]/20 bg-[#121414]/80 backdrop-blur-xl',
      )}
    >
      <nav className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Go to homepage"
          className="flex items-center gap-2"
        >
          <span className="text-2xl leading-[1.3] font-bold tracking-[-0.01em] text-[#e3e2e2]">
            JianGui
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive
              = href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'relative text-base leading-[1.6] font-normal transition-colors',
                    isActive
                      ? 'border-b-2 border-[#aec6ff] pb-1 font-bold text-[#e3e2e2]'
                      : 'text-[#8e9192] hover:text-[#e3e2e2]',
                  )}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Desktop CTA — hidden on resume-preview */}
        <div className="mr-6 hidden items-center gap-2 md:flex">
          {pathname !== '/resume-preview' && <DownloadPdfButton />}
          <LanguageSwitcher />
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(v => !v)}
          className="flex items-center justify-center rounded-md p-2 text-[#8e9192] transition-colors hover:text-[#e3e2e2] md:hidden"
        >
          <span
            className="material-symbols-outlined text-2xl"
            aria-hidden="true"
          >
            {mobileOpen ? 'close' : 'menu'}
          </span>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        role="dialog"
        aria-label={t('menuLabel')}
        aria-modal="false"
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out md:hidden',
          mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0',
          'border-b border-[#444748]/20 bg-[#121414]/95 backdrop-blur-md',
        )}
      >
        <ul className="flex flex-col gap-1 px-6 pt-2 pb-6">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive
              = href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'flex items-center rounded-md px-3 py-3 text-base font-medium transition-colors',
                    isActive
                      ? 'text-[#e3e2e2]'
                      : 'text-[#8e9192] hover:text-[#e3e2e2]',
                  )}
                >
                  {label}
                </Link>
              </li>
            )
          })}
          {pathname !== '/resume-preview' && (
            <li className="pt-2">
              <DownloadPdfButton fullWidth />
            </li>
          )}
          <li className="flex justify-end pt-1">
            <LanguageSwitcher />
          </li>
        </ul>
      </div>
    </header>
  )
}
