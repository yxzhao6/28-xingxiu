import { useState } from 'react'
import type { Mansion } from '../domain/xiu'
import { getSculptureAlt, getSculptureSrc } from '../data/yuhuangmiao'

interface SculptureBackdropProps {
  mansion: Mansion
  className?: string
  /** 角色卡片用 cover；详情页可用 contain / cover */
  fit?: 'cover' | 'contain'
}

export function SculptureBackdrop({
  mansion,
  className = '',
  fit = 'cover',
}: SculptureBackdropProps) {
  const [failed, setFailed] = useState(false)
  const src = getSculptureSrc(mansion.id)

  return (
    <div
      className={`sculpture-backdrop palace-${mansion.palace} ${className}`.trim()}
      data-fit={fit}
    >
      {!failed ? (
        <img
          className="sculpture-backdrop__image"
          src={src}
          alt={getSculptureAlt(mansion)}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="sculpture-backdrop__placeholder" aria-hidden="true">
          <span className="sculpture-backdrop__glyph">{mansion.name}</span>
          <span className="sculpture-backdrop__hint">玉皇庙彩塑</span>
        </div>
      )}
      <div className="sculpture-backdrop__veil" aria-hidden="true" />
    </div>
  )
}
