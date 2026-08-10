import { describe, expect, it } from 'vitest'
import { MANSIONS } from '../data/xiu28'
import { drawMansion } from './draw'

describe('drawMansion', () => {
  it('maps injected random values to expected mansions', () => {
    expect(drawMansion(MANSIONS, () => 0).fullName).toBe('角木蛟')
    expect(drawMansion(MANSIONS, () => 0.5).fullName).toBe('奎木狼')
    expect(drawMansion(MANSIONS, () => 0.999999).fullName).toBe('轸水蚓')
  })

  it('throws on an empty list', () => {
    expect(() => drawMansion([])).toThrow(/empty mansion list/)
  })
})
