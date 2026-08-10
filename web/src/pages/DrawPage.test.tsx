import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { DrawPage } from './DrawPage'

describe('DrawPage', () => {
  it('draws a mansion with the disclaimer', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <DrawPage random={() => 0} />
      </MemoryRouter>,
    )

    await user.type(
      screen.getByPlaceholderText('例如：这次合作我该注意什么？'),
      '我该怎么推进',
    )
    await user.click(screen.getByRole('button', { name: '唤醒一宿' }))

    expect(await screen.findByText('角木蛟')).toBeInTheDocument()
    expect(screen.getByText('现代互动玩法')).toBeInTheDocument()
    expect(
      screen.getByText('抽宿用于灵感与自我觉察，不代表传统占法。'),
    ).toBeInTheDocument()
    expect(screen.getByText('你问：我该怎么推进')).toBeInTheDocument()
  })
})
