import type { Mansion } from '../domain/xiu'
import { LayerBadge } from './LayerBadge'
import { MansionSigil } from './MansionSigil'

interface MansionCardProps {
  mansion: Mansion
  eyebrow?: string
  note?: string
  compact?: boolean
}

export function MansionCard({
  mansion,
  eyebrow,
  note,
  compact = false,
}: MansionCardProps) {
  return (
    <article className={`mansion-card${compact ? ' is-compact' : ''}`}>
      {eyebrow ? <p className="mansion-card__eyebrow">{eyebrow}</p> : null}
      <div className="mansion-card__body">
        <MansionSigil mansion={mansion} awakened />
        <div className="mansion-card__copy">
          <h2 className="mansion-card__title">{mansion.fullName}</h2>
          <p className="mansion-card__meta">
            {mansion.palace} · {mansion.direction} · {mansion.luminary}
            {mansion.animal}
          </p>
          <p className="mansion-card__line">{mansion.awakeningLine}</p>
          {note ? <p className="mansion-card__note">{note}</p> : null}
          <div className="mansion-card__layers">
            {mansion.layers.map((layer) => (
              <LayerBadge key={layer} layer={layer} />
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
