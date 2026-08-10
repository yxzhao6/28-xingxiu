import { describe, expect, it } from 'vitest'
import { clearProfile, readProfile, saveProfile } from './profileStorage'
import type { Profile } from './profileStorage'

const valid: Profile = {
  version: 1,
  birthDate: '1986-05-29',
  natalMansionId: 'dou-mu',
  createdAt: '2026-08-10T00:00:00.000Z',
}

describe('profileStorage', () => {
  it('round-trips a valid profile', () => {
    saveProfile(valid)
    expect(readProfile()).toEqual(valid)
  })

  it('returns null for malformed JSON, wrong version, or missing fields', () => {
    localStorage.setItem('xingxiu.profile.v1', '{')
    expect(readProfile()).toBeNull()

    localStorage.setItem(
      'xingxiu.profile.v1',
      JSON.stringify({ ...valid, version: 2 }),
    )
    expect(readProfile()).toBeNull()

    localStorage.setItem(
      'xingxiu.profile.v1',
      JSON.stringify({ version: 1, birthDate: '1986-05-29' }),
    )
    expect(readProfile()).toBeNull()
  })

  it('clears the profile', () => {
    saveProfile(valid)
    clearProfile()
    expect(readProfile()).toBeNull()
  })
})
