import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderApp } from '../test/renderApp'

describe('OnboardingPage', () => {
  it('reveals the birth mansion and saves the profile', async () => {
    const user = userEvent.setup()
    renderApp('/onboarding')

    const input = screen.getByLabelText('公历生日')
    fireEvent.change(input, { target: { value: '1986-05-29' } })

    const submit = screen.getByRole('button', { name: '唤醒本命宿' })
    await waitFor(() => expect(submit).toBeEnabled())
    await user.click(submit)

    expect(await screen.findByText('斗木獬')).toBeInTheDocument()
    expect(screen.getByText('你的本命宿')).toBeInTheDocument()
    expect(screen.getByText(/按出生当日值宿 · 公历 1986-05-29/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '进入今日' }))
    expect(
      await screen.findByRole('heading', { name: '中国黄历 · 今日值宿' }),
    ).toBeInTheDocument()
  })

  it('rejects future dates', async () => {
    const user = userEvent.setup()
    renderApp('/onboarding')
    const input = screen.getByLabelText('公历生日')
    fireEvent.change(input, { target: { value: '2099-01-01' } })
    const submit = screen.getByRole('button', { name: '唤醒本命宿' })
    await waitFor(() => expect(submit).toBeEnabled())
    await user.click(submit)
    expect(screen.getByRole('alert')).toHaveTextContent('不能晚于今天')
  })

  it('accepts a lunar birthday and reveals the matching mansion', async () => {
    const user = userEvent.setup()
    renderApp('/onboarding')

    await user.click(screen.getByRole('button', { name: '农历' }))
    fireEvent.change(screen.getByLabelText('年'), { target: { value: '1986' } })
    fireEvent.change(screen.getByLabelText('月'), { target: { value: '4' } })
    fireEvent.change(screen.getByLabelText('日'), { target: { value: '21' } })

    const submit = screen.getByRole('button', { name: '唤醒本命宿' })
    await waitFor(() => expect(submit).toBeEnabled())
    await user.click(submit)

    expect(await screen.findByText('斗木獬')).toBeInTheDocument()
    expect(screen.getByText(/公历 1986-05-29/)).toBeInTheDocument()
  })
})
