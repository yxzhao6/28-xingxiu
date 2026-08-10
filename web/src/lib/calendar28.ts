import { Lunar, LunarMonth, LunarYear, Solar } from 'lunar-typescript'
import { getMansionByName } from '../data/xiu28'
import type { Mansion } from '../domain/xiu'

export const MIN_BIRTH_DATE = '1901-01-01'
export const MIN_LUNAR_YEAR = 1901
export const MAX_LUNAR_YEAR = 2100

export type LunarBirthParts = {
  year: number
  month: number
  day: number
  isLeap: boolean
}

function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

export function formatLocalDate(date: Date): string {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`
}

function lunarMonthNumber({ year, month, isLeap }: Omit<LunarBirthParts, 'day'>): number {
  if (!Number.isInteger(year) || year < MIN_LUNAR_YEAR || year > MAX_LUNAR_YEAR) {
    throw new Error(`Unsupported lunar year: ${year}`)
  }
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error(`Invalid lunar month: ${month}`)
  }
  if (isLeap) {
    const leapMonth = LunarYear.fromYear(year).getLeapMonth()
    if (leapMonth !== month) {
      throw new Error(`No leap month ${month} in lunar year ${year}`)
    }
    return -month
  }
  return month
}

export function getLeapMonth(year: number): number {
  if (!Number.isInteger(year) || year < MIN_LUNAR_YEAR || year > MAX_LUNAR_YEAR) {
    return 0
  }
  return LunarYear.fromYear(year).getLeapMonth()
}

export function getLunarDayCount(parts: Omit<LunarBirthParts, 'day'>): number {
  const month = lunarMonthNumber(parts)
  return LunarMonth.fromYm(parts.year, month).getDayCount()
}

/** Convert a Chinese lunar civil date to solar `YYYY-MM-DD`. */
export function solarDateFromLunar(parts: LunarBirthParts): string {
  const month = lunarMonthNumber(parts)
  if (!Number.isInteger(parts.day) || parts.day < 1 || parts.day > 30) {
    throw new Error(`Invalid lunar day: ${parts.day}`)
  }
  const dayCount = LunarMonth.fromYm(parts.year, month).getDayCount()
  if (parts.day > dayCount) {
    throw new Error(
      `Only ${dayCount} days in lunar year ${parts.year} month ${month}`,
    )
  }
  const solar = Lunar.fromYmd(parts.year, month, parts.day).getSolar()
  return `${solar.getYear()}-${pad2(solar.getMonth())}-${pad2(solar.getDay())}`
}

export function getMansionForSolarDate(dateText: string): Mansion {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateText)) {
    throw new Error(`Invalid date format: ${dateText}`)
  }

  const [yearText, monthText, dayText] = dateText.split('-')
  const year = Number(yearText)
  const month = Number(monthText)
  const day = Number(dayText)

  const roundTrip = new Date(year, month - 1, day)
  if (
    roundTrip.getFullYear() !== year ||
    roundTrip.getMonth() !== month - 1 ||
    roundTrip.getDate() !== day
  ) {
    throw new Error(`Impossible calendar date: ${dateText}`)
  }

  if (dateText < MIN_BIRTH_DATE) {
    throw new Error(`Date before supported range: ${dateText}`)
  }

  const xiuName = Solar.fromYmd(year, month, day).getLunar().getXiu()
  return getMansionByName(xiuName)
}

export function getMansionForLunarDate(parts: LunarBirthParts): Mansion {
  return getMansionForSolarDate(solarDateFromLunar(parts))
}
