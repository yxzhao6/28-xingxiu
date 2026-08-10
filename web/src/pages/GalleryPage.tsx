import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MANSIONS, getMansionsByPalace } from '../data/xiu28'
import { SCULPTURE_CREDIT } from '../data/yuhuangmiao'
import type { Palace } from '../domain/xiu'
import { SculptureBackdrop } from '../components/SculptureBackdrop'

const TABS: Array<'全部' | Palace> = ['全部', '青龙', '玄武', '白虎', '朱雀']

export function GalleryPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('全部')
  const mansions = useMemo(
    () => (tab === '全部' ? MANSIONS : getMansionsByPalace(tab)),
    [tab],
  )

  return (
    <section className="page gallery-page">
      <header className="page-header">
        <h1>星宿图鉴</h1>
        <p className="page-lead">二十八宿 · 四象分区 · 玉皇庙彩塑造型</p>
      </header>

      <div className="filter-tabs" role="group" aria-label="四象筛选">
        {TABS.map((item) => (
          <button
            key={item}
            type="button"
            className={
              tab === item ? 'filter-tabs__btn is-active' : 'filter-tabs__btn'
            }
            aria-pressed={tab === item}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="result-count">共 {mansions.length} 宿</p>

      <ul className="gallery-grid">
        {mansions.map((mansion) => (
          <li key={mansion.id}>
            <Link
              className="gallery-card"
              to={`/gallery/${mansion.id}`}
              aria-label={`${mansion.fullName}，${mansion.palace}`}
            >
              <SculptureBackdrop mansion={mansion} />
              <div className="gallery-card__copy">
                <span className="gallery-card__glyph">{mansion.name}</span>
                <span className="gallery-card__name">{mansion.fullName}</span>
                <span className="gallery-card__meta">{mansion.palace}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <p className="sculpture-credit">{SCULPTURE_CREDIT}</p>
    </section>
  )
}
