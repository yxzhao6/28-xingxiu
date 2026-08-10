import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { BRAND_NAME, BRAND_SUBTITLE } from '../domain/brand'
import type { Mansion } from '../domain/xiu'
import {
  MIN_BIRTH_DATE,
  MIN_LUNAR_YEAR,
  formatLocalDate,
  getLeapMonth,
  getLunarDayCount,
  getMansionForSolarDate,
  solarDateFromLunar,
} from '../lib/calendar28'
import { readProfile, saveProfile } from '../lib/profileStorage'
import { MansionCard } from '../components/MansionCard'
import { MansionSigil } from '../components/MansionSigil'

type CalendarMode = 'solar' | 'lunar'

const LUNAR_MONTH_LABELS = [
  '正月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '冬月',
  '腊月',
] as const

const LUNAR_DAY_LABELS = [
  '初一',
  '初二',
  '初三',
  '初四',
  '初五',
  '初六',
  '初七',
  '初八',
  '初九',
  '初十',
  '十一',
  '十二',
  '十三',
  '十四',
  '十五',
  '十六',
  '十七',
  '十八',
  '十九',
  '二十',
  '廿一',
  '廿二',
  '廿三',
  '廿四',
  '廿五',
  '廿六',
  '廿七',
  '廿八',
  '廿九',
  '三十',
] as const

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function OnboardingPage() {
  const navigate = useNavigate()
  const existing = readProfile()
  const today = formatLocalDate(new Date())
  const maxLunarYear = Number(today.slice(0, 4))
  const [calendarMode, setCalendarMode] = useState<CalendarMode>('solar')
  const [birthDate, setBirthDate] = useState('')
  const [lunarYear, setLunarYear] = useState('')
  const [lunarMonth, setLunarMonth] = useState('1')
  const [lunarDay, setLunarDay] = useState('1')
  const [lunarLeap, setLunarLeap] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [revealed, setRevealed] = useState<Mansion | null>(null)
  const [resolvedSolarDate, setResolvedSolarDate] = useState<string | null>(null)
  const [awakening, setAwakening] = useState(false)

  const yearNum = Number(lunarYear)
  const monthNum = Number(lunarMonth)
  const leapMonth = useMemo(
    () => (Number.isInteger(yearNum) ? getLeapMonth(yearNum) : 0),
    [yearNum],
  )
  const canUseLeap = leapMonth > 0 && leapMonth === monthNum
  const dayCount = useMemo(() => {
    if (!Number.isInteger(yearNum) || yearNum < MIN_LUNAR_YEAR) return 30
    try {
      return getLunarDayCount({
        year: yearNum,
        month: monthNum,
        isLeap: lunarLeap && canUseLeap,
      })
    } catch {
      return 30
    }
  }, [yearNum, monthNum, lunarLeap, canUseLeap])

  useEffect(() => {
    if (Number(lunarDay) > dayCount) {
      setLunarDay(String(dayCount))
    }
  }, [dayCount, lunarDay])

  const canSubmit =
    calendarMode === 'solar'
      ? birthDate.length === 10
      : lunarYear.length === 4 &&
        Number.isInteger(yearNum) &&
        yearNum >= MIN_LUNAR_YEAR &&
        yearNum <= maxLunarYear

  if (existing) {
    return <Navigate to="/today" replace />
  }

  function revealMansion(mansion: Mansion, solarDate: string) {
    setResolvedSolarDate(solarDate)
    if (prefersReducedMotion()) {
      setRevealed(mansion)
      setAwakening(false)
      return
    }
    setAwakening(true)
    window.setTimeout(() => {
      setRevealed(mansion)
      setAwakening(false)
    }, 700)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)

    try {
      let solarDate = birthDate

      if (calendarMode === 'lunar') {
        if (!lunarYear) {
          setError('请填写农历年份')
          return
        }
        const isLeap = lunarLeap && canUseLeap
        solarDate = solarDateFromLunar({
          year: yearNum,
          month: monthNum,
          day: Number(lunarDay),
          isLeap,
        })
      } else if (!birthDate) {
        setError('请选择出生日期')
        return
      }

      if (solarDate < MIN_BIRTH_DATE) {
        setError(`出生日期不能早于 ${MIN_BIRTH_DATE}`)
        return
      }
      if (solarDate > today) {
        setError('出生日期不能晚于今天')
        return
      }

      revealMansion(getMansionForSolarDate(solarDate), solarDate)
    } catch {
      setError(
        calendarMode === 'lunar'
          ? '无法识别这个农历日期，请检查年、月、日或闰月'
          : '无法识别这个日期，请重新选择',
      )
    }
  }

  function enterToday() {
    if (!revealed || !resolvedSolarDate) return
    saveProfile({
      version: 1,
      birthDate: resolvedSolarDate,
      natalMansionId: revealed.id,
      createdAt: new Date().toISOString(),
    })
    navigate('/today')
  }

  function switchMode(mode: CalendarMode) {
    setCalendarMode(mode)
    setError(null)
  }

  return (
    <section className="page onboarding-page">
      <header className="page-header">
        <p className="brand-kicker">{BRAND_SUBTITLE}</p>
        <h1 className="brand-title">{BRAND_NAME}</h1>
        <p className="page-lead">
          输入生日，按中国黄历二十八宿查看出生当日值宿。这是文化体验，不是命运判决。
        </p>
      </header>

      {!revealed ? (
        <form className="panel" onSubmit={handleSubmit} noValidate>
          <div className="sigil-stage">
            <MansionSigil awakened={awakening} label="待唤醒的星宿印" />
          </div>

          <div
            className="calendar-mode"
            role="group"
            aria-label="生日历法"
          >
            <button
              type="button"
              className={
                calendarMode === 'solar'
                  ? 'calendar-mode__btn calendar-mode__btn--active'
                  : 'calendar-mode__btn'
              }
              aria-pressed={calendarMode === 'solar'}
              onClick={() => switchMode('solar')}
            >
              公历
            </button>
            <button
              type="button"
              className={
                calendarMode === 'lunar'
                  ? 'calendar-mode__btn calendar-mode__btn--active'
                  : 'calendar-mode__btn'
              }
              aria-pressed={calendarMode === 'lunar'}
              onClick={() => switchMode('lunar')}
            >
              农历
            </button>
          </div>

          {calendarMode === 'solar' ? (
            <label className="field">
              <span className="field__label">公历生日</span>
              <input
                type="date"
                name="birthDate"
                min={MIN_BIRTH_DATE}
                max={today}
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
            </label>
          ) : (
            <fieldset className="lunar-fields">
              <legend className="field__label">农历生日</legend>
              <div className="lunar-fields__row">
                <label className="field">
                  <span className="field__label">年</span>
                  <input
                    type="number"
                    name="lunarYear"
                    inputMode="numeric"
                    min={MIN_LUNAR_YEAR}
                    max={maxLunarYear}
                    placeholder="例如 1986"
                    value={lunarYear}
                    onChange={(e) => {
                      setLunarYear(e.target.value)
                      setLunarLeap(false)
                    }}
                    required
                  />
                </label>
                <label className="field">
                  <span className="field__label">月</span>
                  <select
                    name="lunarMonth"
                    value={lunarMonth}
                    onChange={(e) => {
                      setLunarMonth(e.target.value)
                      setLunarLeap(false)
                    }}
                  >
                    {LUNAR_MONTH_LABELS.map((label, index) => (
                      <option key={label} value={String(index + 1)}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span className="field__label">日</span>
                  <select
                    name="lunarDay"
                    value={lunarDay}
                    onChange={(e) => setLunarDay(e.target.value)}
                  >
                    {LUNAR_DAY_LABELS.slice(0, dayCount).map((label, index) => (
                      <option key={label} value={String(index + 1)}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="leap-check">
                <input
                  type="checkbox"
                  checked={lunarLeap && canUseLeap}
                  disabled={!canUseLeap}
                  onChange={(e) => setLunarLeap(e.target.checked)}
                />
                <span>
                  {canUseLeap
                    ? `闰${LUNAR_MONTH_LABELS[leapMonth - 1]}`
                    : leapMonth > 0
                      ? `本年闰${LUNAR_MONTH_LABELS[leapMonth - 1]}，请先选该月`
                      : '本年无闰月'}
                </span>
              </label>
              <p className="field-hint">将换算为对应公历日，再查黄历值宿。</p>
            </fieldset>
          )}

          {error ? <p className="form-error" role="alert">{error}</p> : null}
          <button
            className="btn btn--primary"
            type="submit"
            disabled={!canSubmit || awakening}
          >
            {awakening ? '星宿苏醒中…' : '唤醒本命宿'}
          </button>
        </form>
      ) : (
        <div className="panel reveal-panel">
          <MansionCard
            mansion={revealed}
            eyebrow="你的本命宿"
            note={
              resolvedSolarDate
                ? `按出生当日值宿 · 公历 ${resolvedSolarDate}`
                : '按出生当日值宿'
            }
          />
          <button className="btn btn--primary" type="button" onClick={enterToday}>
            进入今日
          </button>
        </div>
      )}
    </section>
  )
}
