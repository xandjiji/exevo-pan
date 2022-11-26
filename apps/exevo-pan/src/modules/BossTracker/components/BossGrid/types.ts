import { listBy } from './utils'

export type BossGridProps = {
  server: string
  bosses: BossStats[]
} & JSX.IntrinsicElements['section']

export type BossLister = (list: BossStats[]) => BossStats[]

export type ListOption = keyof typeof listBy

export const PINNED_BOSS_KEY = 'boss-tracker-favs'
