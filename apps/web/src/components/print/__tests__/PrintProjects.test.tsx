import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import PrintProjects from '../PrintProjects'

describe('printProjects', () => {
  it('renders the Key Projects heading', () => {
    render(<PrintProjects />)
    expect(
      screen.getByRole('heading', { name: /key projects/i }),
    ).toBeInTheDocument()
  })

  it('renders at least 2 project cards', () => {
    render(<PrintProjects />)
    const cards = screen.getAllByRole('heading', { level: 3 })
    expect(cards.length).toBeGreaterThanOrEqual(2)
  })

  it('renders exactly 4 project cards (2×2 grid)', () => {
    render(<PrintProjects />)
    const cards = screen.getAllByRole('heading', { level: 3 })
    expect(cards.length).toBe(4)
  })

  it('renders tag pills on project cards', () => {
    render(<PrintProjects />)
    expect(screen.getByText('Solidity')).toBeInTheDocument()
  })
})
