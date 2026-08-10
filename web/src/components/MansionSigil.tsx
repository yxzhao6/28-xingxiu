import type { Mansion } from '../domain/xiu'

interface MansionSigilProps {
  mansion?: Mansion | null
  awakened?: boolean
  label?: string
}

export function MansionSigil({
  mansion = null,
  awakened = false,
  label = '星宿印',
}: MansionSigilProps) {
  const char = mansion?.name ?? '宿'
  return (
    <div
      className={`mansion-sigil${awakened ? ' is-awakened' : ''}`}
      role="img"
      aria-label={mansion ? `${label}：${mansion.fullName}` : label}
    >
      <svg viewBox="0 0 200 200" className="mansion-sigil__svg" aria-hidden="true">
        <circle cx="100" cy="100" r="92" className="mansion-sigil__ring" />
        <circle cx="100" cy="100" r="78" className="mansion-sigil__ring mansion-sigil__ring--inner" />
        <g className="mansion-sigil__stars">
          <circle cx="100" cy="28" r="2.5" />
          <circle cx="155" cy="55" r="2" />
          <circle cx="172" cy="100" r="2.5" />
          <circle cx="155" cy="145" r="2" />
          <circle cx="100" cy="172" r="2.5" />
          <circle cx="45" cy="145" r="2" />
          <circle cx="28" cy="100" r="2.5" />
        </g>
        <text x="100" y="36" textAnchor="middle" className="mansion-sigil__mark">
          东
        </text>
        <text x="168" y="104" textAnchor="middle" className="mansion-sigil__mark">
          南
        </text>
        <text x="100" y="178" textAnchor="middle" className="mansion-sigil__mark">
          西
        </text>
        <text x="32" y="104" textAnchor="middle" className="mansion-sigil__mark">
          北
        </text>
        <circle cx="100" cy="100" r="42" className="mansion-sigil__core" />
        <text x="100" y="112" textAnchor="middle" className="mansion-sigil__glyph">
          {char}
        </text>
      </svg>
    </div>
  )
}
