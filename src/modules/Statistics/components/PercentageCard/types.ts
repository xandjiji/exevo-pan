export interface PercentageCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  percentage: number
}

export interface PercentageStyleProps {
  positive: boolean
}
