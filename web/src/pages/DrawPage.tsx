import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MANSIONS } from '../data/xiu28'
import type { Mansion } from '../domain/xiu'
import { drawMansion } from '../lib/draw'
import { MansionCard } from '../components/MansionCard'
import { MansionSigil } from '../components/MansionSigil'

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function DrawPage({
  random = Math.random,
}: {
  random?: () => number
}) {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState<Mansion | null>(null)
  const [revealing, setRevealing] = useState(false)

  function awaken() {
    if (revealing) return
    const mansion = drawMansion(MANSIONS, random)
    if (prefersReducedMotion()) {
      setResult(mansion)
      return
    }
    setRevealing(true)
    setResult(null)
    window.setTimeout(() => {
      setResult(mansion)
      setRevealing(false)
    }, 700)
  }

  return (
    <section className="page draw-page">
      <header className="page-header">
        <h1>问宿</h1>
        <p className="page-lead">
          带着一个问题，唤醒一宿。此为现代互动玩法，用于灵感与自我觉察。
        </p>
      </header>

      <label className="field">
        <span className="field__label">你的问题（可选）</span>
        <input
          type="text"
          maxLength={80}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="例如：这次合作我该注意什么？"
        />
      </label>

      {!result ? (
        <div className="panel">
          <div className="sigil-stage">
            <MansionSigil awakened={revealing} label="待唤醒的问宿印" />
          </div>
          <button
            className="btn btn--primary"
            type="button"
            onClick={awaken}
            disabled={revealing}
          >
            {revealing ? '星宿苏醒中…' : '唤醒一宿'}
          </button>
        </div>
      ) : (
        <div className="panel reveal-panel">
          {prompt.trim() ? (
            <p className="prompt-echo">你问：{prompt.trim()}</p>
          ) : null}
          <MansionCard mansion={result} eyebrow="现代互动玩法" />
          <p className="modern-reading">{result.modernReading}</p>
          <p className="disclaimer">
            抽宿用于灵感与自我觉察，不代表传统占法。
          </p>
          <div className="cta-row">
            <button className="btn btn--ghost" type="button" onClick={awaken}>
              再问一次
            </button>
            <Link className="btn btn--primary" to="/gallery">
              去看图鉴
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}
