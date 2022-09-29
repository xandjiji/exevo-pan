export type BossCardProps = {
  pinned: boolean
  onPìn: (bossName: string) => void
  bossStats: BossStats
} & JSX.IntrinsicElements['li']

export type ChanceClass = 'UNKNOWN' | 'ZERO' | 'POSSIBLE' | 'LIKELY'
