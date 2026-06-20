import type { Metadata } from 'next'
import AboutSection from '@/components/home/AboutSection'
import CapabilitySection from '@/components/home/CapabilitySection'
import ContactSection from '@/components/home/ContactSection'
import HeroSection from '@/components/home/HeroSection'
import ProjectsSection from '@/components/home/ProjectsSection'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export const metadata: Metadata = {
  title: 'jiangui.eth — Senior Full-Stack Engineer',
  description:
    'Senior Full-Stack & Web3 Engineer specialising in high-throughput backends, DeFi protocols, and pixel-precise frontends.',
  keywords: [
    'full-stack engineer',
    'web3',
    'solidity',
    'next.js',
    'typescript',
    'defi',
    'portfolio',
  ],
  openGraph: {
    title: 'jiangui.eth — Senior Full-Stack Engineer',
    description:
      'Senior Full-Stack & Web3 Engineer specialising in high-throughput backends, DeFi protocols, and pixel-precise frontends.',
    url: '/',
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: 'jiangui.eth' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'jiangui.eth — Senior Full-Stack Engineer',
    description:
      'Senior Full-Stack & Web3 Engineer specialising in high-throughput backends, DeFi protocols, and pixel-precise frontends.',
  },
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <CapabilitySection />
      <ProjectsSection />
      <ContactSection />
    </>
  )
}
