import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import HomePage from '../page'

// Mock async Server Component sections so Home (sync) renders them inline
vi.mock('@/components/home/HeroSection', () => ({
  default: () => (
    <section aria-label="Hero">
      <h1>JianGui</h1>
    </section>
  ),
}))

vi.mock('@/components/home/AboutSection', () => ({
  default: () => (
    <section aria-label="About">
      <p>深耕工程，精益求精</p>
    </section>
  ),
}))

vi.mock('@/components/home/CapabilitySection', () => ({
  default: () => (
    <section aria-label="核心技术栈">
      <h3>核心技术栈</h3>
    </section>
  ),
}))

vi.mock('@/components/home/ProjectsSection', () => ({
  default: () => (
    <section aria-label="精选项目">
      <h3>精选项目</h3>
    </section>
  ),
}))

vi.mock('@/components/home/ContactSection', () => ({
  default: () => (
    <section aria-label="Contact">
      <h3>Contact</h3>
    </section>
  ),
}))

vi.mock('@/lib/analytics', () => ({ track: vi.fn() }))

describe('home Page — /', () => {
  it('renders the hero section with candidate name in h1', () => {
    render(<HomePage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders the hero region landmark', () => {
    render(<HomePage />)
    expect(screen.getByRole('region', { name: /hero/i })).toBeInTheDocument()
  })

  it('renders the About section', () => {
    render(<HomePage />)
    expect(screen.getByText(/深耕工程，精益求精/)).toBeInTheDocument()
  })

  it('renders the Capability section heading', () => {
    render(<HomePage />)
    expect(screen.getByText(/核心技术栈/)).toBeInTheDocument()
  })

  it('renders the Selected Works heading', () => {
    render(<HomePage />)
    expect(screen.getByText(/精选项目/)).toBeInTheDocument()
  })

  it('renders the Contact section', () => {
    render(<HomePage />)
    expect(
      screen.getByRole('region', { name: /contact/i }),
    ).toBeInTheDocument()
  })
})
