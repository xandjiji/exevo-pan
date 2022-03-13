type ComparisonItem = {
  name: string
  summaryValue: string
  dataArray: DataSnapshot[]
}

export interface ComparisonChartProps
  extends React.HTMLAttributes<HTMLDivElement> {
  guildA: ComparisonItem
  guildB: ComparisonItem
  tooltipSuffix: string
  dateLabelType: 'Time' | 'Date'
}
