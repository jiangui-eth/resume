import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import PrintExperience from '../PrintExperience'

describe('printExperience', () => {
  it('renders the Professional Experience heading', () => {
    render(<PrintExperience />)
    expect(
      screen.getByRole('heading', { name: /professional experience/i }),
    ).toBeInTheDocument()
  })

  it('renders exactly 4 experience entries', () => {
    render(<PrintExperience />)
    const entries = screen.getAllByRole('heading', { level: 3 })
    expect(entries.length).toBe(4)
  })

  it('each entry has a period', () => {
    render(<PrintExperience />)
    expect(screen.getByText(/2023\s*–\s*present/i)).toBeInTheDocument()
  })

  it('renders bullet points for each entry', () => {
    render(<PrintExperience />)
    const bullets = screen.getAllByRole('listitem')
    expect(bullets.length).toBeGreaterThan(4)
  })
})
