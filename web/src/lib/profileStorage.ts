export interface Profile {
  version: 1
  birthDate: string
  natalMansionId: string
  createdAt: string
}

const STORAGE_KEY = 'xingxiu.profile.v1'

function isProfile(value: unknown): value is Profile {
  if (!value || typeof value !== 'object') return false
  const p = value as Record<string, unknown>
  return (
    p.version === 1 &&
    typeof p.birthDate === 'string' &&
    typeof p.natalMansionId === 'string' &&
    typeof p.createdAt === 'string'
  )
}

export function readProfile(): Profile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    return isProfile(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function saveProfile(profile: Profile): void {
  if (!isProfile(profile)) {
    throw new Error('Invalid profile')
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
}

export function clearProfile(): void {
  localStorage.removeItem(STORAGE_KEY)
}
