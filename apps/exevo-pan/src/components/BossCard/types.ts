export type BossCardProps = {
  premium?: boolean
  actionIcon: JSX.Element
  actionLabel: string
  action: (bossName: string) => void
  bossStats: BossStats
  checkedAt?: Date
} & JSX.IntrinsicElements['li']

export type ChanceClass = 'UNKNOWN' | 'ZERO' | 'POSSIBLE' | 'LIKELY'
