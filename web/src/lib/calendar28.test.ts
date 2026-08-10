import { describe, expect, it } from 'vitest'
import {
  MIN_BIRTH_DATE,
  formatLocalDate,
  getLeapMonth,
  getMansionForLunarDate,
  getMansionForSolarDate,
  solarDateFromLunar,
} from './calendar28'

const LUMINARY_BY_WEEKDAY = ['日', '月', '火', '水', '木', '金', '土'] as const

function addDays(dateText: string, days: number): string {
  const [y, m, d] = dateText.split('-').map(Number)
  const date = new Date(y!, m! - 1, d!)
  date.setDate(date.getDate() + days)
  return formatLocalDate(date)
}

describe('calendar28', () => {
  it('resolves the documented 1986-05-29 anchor to 斗木獬', () => {
    const m = getMansionForSolarDate('1986-05-29')
    expect(m.name).toBe('斗')
    expect(m.fullName).toBe('斗木獬')
  })

  it('advances index by one across consecutive days, wrapping at 28', () => {
    const monthRunStart = '1986-05-29'
    for (let i = 0; i < 5; i += 1) {
      const current = getMansionForSolarDate(addDays(monthRunStart, i))
      const next = getMansionForSolarDate(addDays(monthRunStart, i + 1))
      const expected = current.index === 28 ? 1 : current.index + 1
      expect(next.index).toBe(expected)
    }

    const yearRunStart = '2023-12-29'
    for (let i = 0; i < 5; i += 1) {
      const current = getMansionForSolarDate(addDays(yearRunStart, i))
      const next = getMansionForSolarDate(addDays(yearRunStart, i + 1))
      const expected = current.index === 28 ? 1 : current.index + 1
      expect(next.index).toBe(expected)
    }
  })

  it('pins luminaries to weekdays across 40 consecutive days', () => {
    const start = '1986-05-29'
    for (let i = 0; i < 40; i += 1) {
      const dateText = addDays(start, i)
      const [y, m, d] = dateText.split('-').map(Number)
      const weekday = new Date(y!, m! - 1, d!).getDay()
      const mansion = getMansionForSolarDate(dateText)
      expect(mansion.luminary).toBe(LUMINARY_BY_WEEKDAY[weekday])
    }
  })

  it('visits all 28 mansions exactly once across 28 consecutive days', () => {
    const names = new Set<string>()
    for (let i = 0; i < 28; i += 1) {
      names.add(getMansionForSolarDate(addDays('1986-05-29', i)).name)
    }
    expect(names.size).toBe(28)
  })

  it('accepts leap day and the lower boundary', () => {
    expect(getMansionForSolarDate('2024-02-29')).toBeTruthy()
    expect(getMansionForSolarDate(MIN_BIRTH_DATE)).toBeTruthy()
  })

  it('rejects malformed, impossible, and out-of-range dates', () => {
    for (const bad of ['', '1986-5-29', '2023-02-30', 'abc', '1900-12-31']) {
      expect(() => getMansionForSolarDate(bad)).toThrow()
    }
  })

  it('formats local dates without UTC drift across the day', () => {
    const morning = new Date(1986, 4, 29, 0, 30)
    const evening = new Date(1986, 4, 29, 23, 30)
    expect(formatLocalDate(morning)).toBe('1986-05-29')
    expect(formatLocalDate(evening)).toBe('1986-05-29')
    expect(getMansionForSolarDate(formatLocalDate(morning)).fullName).toBe(
      '斗木獬',
    )
    expect(getMansionForSolarDate(formatLocalDate(evening)).fullName).toBe(
      '斗木獬',
    )
  })

  it('converts lunar birthdates to the matching solar day and mansion', () => {
    expect(
      solarDateFromLunar({ year: 1986, month: 4, day: 21, isLeap: false }),
    ).toBe('1986-05-29')
    expect(
      getMansionForLunarDate({ year: 1986, month: 4, day: 21, isLeap: false })
        .fullName,
    ).toBe('斗木獬')
  })

  it('supports leap months and rejects impossible leap selections', () => {
    expect(getLeapMonth(2023)).toBe(2)
    expect(
      solarDateFromLunar({ year: 2023, month: 2, day: 15, isLeap: true }),
    ).toBe('2023-04-05')
    expect(() =>
      solarDateFromLunar({ year: 1986, month: 4, day: 21, isLeap: true }),
    ).toThrow()
  })
})
