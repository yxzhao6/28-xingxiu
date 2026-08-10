import type { Mansion } from '../domain/xiu'

/** 晋城府城玉皇庙二十八宿彩塑素材路径约定。 */
export const SCULPTURE_CREDIT =
  '造型参考：晋城府城玉皇庙元代二十八宿彩塑'

export function getSculptureSrc(mansionId: string): string {
  return `/yuhuangmiao/${mansionId}.jpg`
}

export function getSculptureAlt(mansion: Mansion): string {
  return `${mansion.fullName} · 玉皇庙彩塑造型`
}
