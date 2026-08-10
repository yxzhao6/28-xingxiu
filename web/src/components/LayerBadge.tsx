import type { ContentLayer } from '../domain/xiu'

export function LayerBadge({ layer }: { layer: ContentLayer }) {
  return <span className={`layer-badge layer-badge--${layer}`}>{layer}</span>
}
