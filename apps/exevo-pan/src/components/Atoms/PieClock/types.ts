export type PieClockProps = {
  percentage: number
  invert?: boolean
  size?: 'small' | 'medium' | 'large'
} & JSX.IntrinsicElements['div']
