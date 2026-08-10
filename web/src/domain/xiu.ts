export type Palace = '青龙' | '玄武' | '白虎' | '朱雀'
export type ContentLayer = '传统民俗' | '现代创作'

export interface Mansion {
  id: string
  index: number
  name: string
  pinyin: string
  palace: Palace
  direction: '东' | '北' | '西' | '南'
  luminary: '木' | '金' | '土' | '日' | '月' | '火' | '水'
  animal: string
  fullName: string
  awakeningLine: string
  modernReading: string
  suitable: string[]
  avoid: string[]
  layers: ContentLayer[]
}
