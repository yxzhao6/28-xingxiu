import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('test harness', () => {
  it('renders with jest-dom matchers', () => {
    render(<p>harness</p>)
    expect(screen.getByText('harness')).toBeInTheDocument()
  })
})
