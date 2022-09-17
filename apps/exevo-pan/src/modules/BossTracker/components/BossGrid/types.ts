import { listBy } from './utils'

export type BossGridProps = {
  bosses: BossStats[]
} & JSX.IntrinsicElements['section']

export type BossLister = (list: BossStats[]) => BossStats[]

export type ListOption = keyof typeof listBy
