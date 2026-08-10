import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import { AppRoutes } from '../App'
import { saveProfile } from '../lib/profileStorage'
import type { Profile } from '../lib/profileStorage'

export function renderApp(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <AppRoutes />
    </MemoryRouter>,
  )
}

export function seedProfile(overrides: Partial<Profile> = {}) {
  const profile: Profile = {
    version: 1,
    birthDate: '1986-05-29',
    natalMansionId: 'dou-mu',
    createdAt: '2026-08-10T00:00:00.000Z',
    ...overrides,
  }
  saveProfile(profile)
  return profile
}
