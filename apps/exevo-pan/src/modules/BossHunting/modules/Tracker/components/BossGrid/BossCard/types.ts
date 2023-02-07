export type BossCardProps = {
  premium?: boolean
  pinned: boolean
  onPin: (bossName: string) => void
  bossStats: BossStats
} & JSX.IntrinsicElements['li']

export type ChanceClass = 'UNKNOWN' | 'ZERO' | 'POSSIBLE' | 'LIKELY'
