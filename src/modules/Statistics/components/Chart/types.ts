type ChartData = {
  current: number
  lastMonth: number[]
}

export interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  totalLabel: string
  yesterdayLabel: string
  tooltipLabel: string
  chartData: ChartData
}
