import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderApp } from '../test/renderApp'

describe('Gallery and detail', () => {
  it('filters by palace and opens a detail page', async () => {
    const user = userEvent.setup()
    renderApp('/gallery')

    expect(screen.getByText('共 28 宿')).toBeInTheDocument()
    expect(
      screen.getByText('造型参考：晋城府城玉皇庙元代二十八宿彩塑'),
    ).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '青龙' }))
    expect(screen.getByText('共 7 宿')).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: /心月狐/ }))
    expect(await screen.findByRole('heading', { name: '心月狐' })).toBeInTheDocument()
    expect(screen.getByText('传统民俗')).toBeInTheDocument()
    expect(screen.getByText('现代创作')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '返回图鉴' })).toBeInTheDocument()
    expect(
      screen.getAllByText('造型参考：晋城府城玉皇庙元代二十八宿彩塑').length,
    ).toBeGreaterThan(0)
  })
})
