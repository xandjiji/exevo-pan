export interface ComparisonChartProps
  extends React.HTMLAttributes<HTMLDivElement> {
  guildA: {
    name: string
    dataArray: DataSnapshot[]
  }
  guildB: {
    name: string
    dataArray: DataSnapshot[]
  }
  tooltipSuffix: string
  dateLabelType: 'Time' | 'Date'
}
