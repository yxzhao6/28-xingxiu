import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { clearProfile, readProfile } from '../lib/profileStorage'
import { renderApp, seedProfile } from '../test/renderApp'
import { TodayPage } from './TodayPage'

describe('TodayPage', () => {
  it('shows today’s mansion and natal strip for a fixed date', () => {
    seedProfile()
    render(
      <MemoryRouter>
        <TodayPage now={new Date(1986, 4, 29)} />
      </MemoryRouter>,
    )
    expect(screen.getByText('斗木獬')).toBeInTheDocument()
    expect(screen.getByText(/你的本命/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '抽一宿问事' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '打开图鉴' })).toBeInTheDocument()
  })

  it('clears the profile after confirmation', async () => {
    const user = userEvent.setup()
    seedProfile()
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    renderApp('/today')
    await user.click(screen.getByRole('button', { name: '重新体验' }))
    expect(readProfile()).toBeNull()
    expect(await screen.findByRole('heading', { name: '唤宿' })).toBeInTheDocument()
    clearProfile()
  })
})
