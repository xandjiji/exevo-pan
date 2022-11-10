export type OverallData = Pick<
  StatisticsData,
  'totalRevenue' | 'totalTibiaCoins' | 'successRate' | 'vocationPercentage'
>

export interface OverallGridProps extends React.HTMLAttributes<HTMLDivElement> {
  overallData: OverallData
}
