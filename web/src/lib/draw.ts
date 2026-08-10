import type { Mansion } from '../domain/xiu'

export function drawMansion(
  mansions: Mansion[],
  random: () => number = Math.random,
): Mansion {
  if (mansions.length === 0) {
    throw new Error('Cannot draw from an empty mansion list')
  }
  const raw = Math.floor(random() * mansions.length)
  const index = Math.min(Math.max(raw, 0), mansions.length - 1)
  return mansions[index]!
}
