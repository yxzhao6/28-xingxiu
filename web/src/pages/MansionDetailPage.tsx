import { Link, Navigate, useParams } from 'react-router-dom'
import { getMansionById } from '../data/xiu28'
import { SCULPTURE_CREDIT } from '../data/yuhuangmiao'
import { LayerBadge } from '../components/LayerBadge'
import { SculptureBackdrop } from '../components/SculptureBackdrop'

export function MansionDetailPage() {
  const { mansionId } = useParams()
  const mansion = mansionId ? getMansionById(mansionId) : undefined

  if (!mansion) {
    return <Navigate to="/gallery" replace />
  }

  return (
    <section className="page detail-page">
      <Link className="text-action" to="/gallery">
        返回图鉴
      </Link>

      <div className="detail-hero">
        <SculptureBackdrop mansion={mansion} fit="cover" />
        <div className="detail-hero__caption">
          <h1>{mansion.fullName}</h1>
          <p>
            {mansion.palace} · {mansion.direction} · {mansion.luminary} ·{' '}
            {mansion.animal}
          </p>
        </div>
      </div>

      <div className="panel soft-panel">
        <p className="soft-panel__label">一句话</p>
        <p>{mansion.awakeningLine}</p>
        <p className="modern-reading">{mansion.modernReading}</p>
        <ul className="yi-ji">
          {mansion.suitable.map((item) => (
            <li key={`yi-${item}`}>
              <strong>宜</strong> {item}
            </li>
          ))}
          {mansion.avoid.map((item) => (
            <li key={`ji-${item}`}>
              <strong>忌</strong> {item}
            </li>
          ))}
        </ul>
        <div className="mansion-card__layers">
          {mansion.layers.map((layer) => (
            <LayerBadge key={layer} layer={layer} />
          ))}
        </div>
        <p className="sculpture-credit">{SCULPTURE_CREDIT}</p>
      </div>
    </section>
  )
}
