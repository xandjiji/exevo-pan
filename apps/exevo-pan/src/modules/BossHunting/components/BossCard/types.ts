export type BossCardProps = {
  premium?: boolean
  bossStats: BossStats
  location?: string
  checkedAt?: Date
  cornerElement?: JSX.Element
  bottomElement?: JSX.Element
} & JSX.IntrinsicElements['li']

export type ChanceClass = 'UNKNOWN' | 'ZERO' | 'POSSIBLE' | 'LIKELY'
