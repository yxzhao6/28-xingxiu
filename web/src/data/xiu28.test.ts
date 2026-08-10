import { describe, expect, it } from 'vitest'
import {
  MANSIONS,
  getMansionById,
  getMansionByName,
  getMansionsByPalace,
} from './xiu28'

const EXPECTED_FULL_NAMES = [
  '角木蛟',
  '亢金龙',
  '氐土貉',
  '房日兔',
  '心月狐',
  '尾火虎',
  '箕水豹',
  '斗木獬',
  '牛金牛',
  '女土蝠',
  '虚日鼠',
  '危月燕',
  '室火猪',
  '壁水貐',
  '奎木狼',
  '娄金狗',
  '胃土雉',
  '昴日鸡',
  '毕月乌',
  '觜火猴',
  '参水猿',
  '井木犴',
  '鬼金羊',
  '柳土獐',
  '星日马',
  '张月鹿',
  '翼火蛇',
  '轸水蚓',
]

describe('xiu28 data', () => {
  it('has exactly 28 unique mansions with indices 1–28', () => {
    expect(MANSIONS).toHaveLength(28)
    expect(new Set(MANSIONS.map((m) => m.id)).size).toBe(28)
    expect(MANSIONS.map((m) => m.index)).toEqual(
      Array.from({ length: 28 }, (_, i) => i + 1),
    )
  })

  it('has seven mansions per palace', () => {
    expect(getMansionsByPalace('青龙')).toHaveLength(7)
    expect(getMansionsByPalace('玄武')).toHaveLength(7)
    expect(getMansionsByPalace('白虎')).toHaveLength(7)
    expect(getMansionsByPalace('朱雀')).toHaveLength(7)
  })

  it('matches the canonical fullName sequence', () => {
    expect(MANSIONS.map((m) => m.fullName)).toEqual(EXPECTED_FULL_NAMES)
    for (const m of MANSIONS) {
      expect(m.fullName).toBe(`${m.name}${m.luminary}${m.animal}`)
      expect(m.awakeningLine.length).toBeGreaterThan(0)
      expect(m.modernReading.length).toBeGreaterThan(0)
      expect(m.suitable.length).toBeGreaterThanOrEqual(2)
      expect(m.avoid.length).toBeGreaterThanOrEqual(2)
      expect(m.layers).toEqual(['传统民俗', '现代创作'])
    }
  })

  it('looks up by name and id', () => {
    expect(getMansionByName('斗').fullName).toBe('斗木獬')
    expect(getMansionById('xin-yue')?.fullName).toBe('心月狐')
    expect(() => getMansionByName('未知')).toThrow(/Unknown mansion name/)
  })
})
