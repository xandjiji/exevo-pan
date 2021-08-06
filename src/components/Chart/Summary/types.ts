export interface SummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: number
  percentage: number
  positive?: boolean
}

export interface PositiveStyleProps {
  positive: boolean
}
