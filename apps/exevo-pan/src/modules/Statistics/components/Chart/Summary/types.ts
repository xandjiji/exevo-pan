export interface SummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: number
  percentage: number
  positive?: boolean
}
