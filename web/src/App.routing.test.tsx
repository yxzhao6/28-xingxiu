import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp, seedProfile } from './test/renderApp'

describe('routing', () => {
  it('sends visitors without a profile to onboarding', () => {
    renderApp('/')
    expect(screen.getByRole('heading', { name: '唤宿' })).toBeInTheDocument()
  })

  it('sends visitors with a profile to today', () => {
    seedProfile()
    renderApp('/')
    expect(
      screen.getByRole('heading', { name: '中国黄历 · 今日值宿' }),
    ).toBeInTheDocument()
  })

  it('protects today and redirects to onboarding', () => {
    renderApp('/today')
    expect(screen.getByRole('heading', { name: '唤宿' })).toBeInTheDocument()
  })

  it('redirects onboarding to today when a profile exists', () => {
    seedProfile()
    renderApp('/onboarding')
    expect(
      screen.getByRole('heading', { name: '中国黄历 · 今日值宿' }),
    ).toBeInTheDocument()
  })

  it('redirects unknown gallery ids to the gallery list', () => {
    renderApp('/gallery/does-not-exist')
    expect(screen.getByRole('heading', { name: '星宿图鉴' })).toBeInTheDocument()
  })
})
