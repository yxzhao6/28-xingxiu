import { Link, useNavigate } from 'react-router-dom'
import { getMansionById } from '../data/xiu28'
import { BRAND_NAME } from '../domain/brand'
import {
  formatLocalDate,
  getMansionForSolarDate,
} from '../lib/calendar28'
import { clearProfile, readProfile } from '../lib/profileStorage'
import { MansionCard } from '../components/MansionCard'

export function TodayPage({ now = new Date() }: { now?: Date }) {
  const navigate = useNavigate()
  const profile = readProfile()
  if (!profile) {
    return null
  }

  const dateText = formatLocalDate(now)
  const todayMansion = getMansionForSolarDate(dateText)
  const natal = getMansionById(profile.natalMansionId)

  function reset() {
    if (window.confirm('确定重新体验？将清除本地本命记录。')) {
      clearProfile()
      navigate('/onboarding')
    }
  }

  return (
    <section className="page today-page">
      <header className="page-header">
        <p className="brand-kicker">{BRAND_NAME}</p>
        <h1>中国黄历 · 今日值宿</h1>
        <p className="page-lead">{dateText}</p>
      </header>

      <MansionCard mansion={todayMansion} eyebrow="今日值宿" />

      <div className="panel soft-panel">
        <p className="soft-panel__label">今日灵感</p>
        <p>{todayMansion.awakeningLine}</p>
        <ul className="yi-ji">
          <li>
            <strong>宜</strong> {todayMansion.suitable[0]}
          </li>
          <li>
            <strong>忌</strong> {todayMansion.avoid[0]}
          </li>
        </ul>
      </div>

      {natal ? (
        <div className="natal-strip">
          <p className="natal-strip__label">你的本命</p>
          <p className="natal-strip__value">
            {natal.fullName} · {natal.palace}
          </p>
          <p className="natal-strip__note">按出生当日值宿 · {profile.birthDate}</p>
        </div>
      ) : null}

      <div className="cta-row">
        <Link className="btn btn--primary" to="/draw">
          抽一宿问事
        </Link>
        <Link className="btn btn--ghost" to="/gallery">
          打开图鉴
        </Link>
      </div>

      <button className="text-action" type="button" onClick={reset}>
        重新体验
      </button>
    </section>
  )
}
