export type BossCardProps = {
  pinned: boolean
  onPìn: (bossName: string) => void
  bossStats: BossStats
}

export type ChanceClass = 'UNKNOWN' | 'ZERO' | 'POSSIBLE' | 'LIKELY'
