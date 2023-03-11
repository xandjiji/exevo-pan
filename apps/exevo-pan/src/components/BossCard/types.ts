type ActionProps =
  | {
      actionIcon: JSX.Element
      actionLabel: string
      action: (bossName: string) => void
    }
  | {
      actionIcon?: never
      actionLabel?: never
      action?: never
    }

export type BossCardProps = {
  premium?: boolean
  bossStats: BossStats
  checkedAt?: Date
} & ActionProps &
  JSX.IntrinsicElements['li']

export type ChanceClass = 'UNKNOWN' | 'ZERO' | 'POSSIBLE' | 'LIKELY'
