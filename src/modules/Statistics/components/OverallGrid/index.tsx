import { memo } from 'react'
import Chart from '../Chart'
import PieChart from '../PieChart'
import PercentageCard from '../PercentageCard'
import * as S from './styles'
import { OverallGridProps } from './types'

const OverallGrid = ({
  statisticsData,
  ...props
}: OverallGridProps): JSX.Element => (
  <S.Wrapper {...props}>
    <S.PageTitle>Tibia Bazaar statistics data and analytics</S.PageTitle>
    <S.ChartWrapper>
      <Chart
        totalLabel="Total volume"
        yesterdayLabel="Yesterday's volume"
        tooltipLabel="Tibia Coins volume"
        chartData={statisticsData.totalTibiaCoins}
      />
      <Chart
        totalLabel="Cipsoft's total revenue"
        yesterdayLabel="Yesterday's revenue"
        tooltipLabel="Cipsoft revenue"
        chartData={statisticsData.totalRevenue}
      />
    </S.ChartWrapper>
    <S.ItemWrapper>
      <PercentageCard
        title="Auction success rate"
        /* @ ToDo: change this assertion after backend refactor */
        percentage={statisticsData.successRate as unknown as number}
      />
      <PieChart
        title="Vocation distribution"
        pieDataSet={statisticsData.vocationPercentage}
      />
    </S.ItemWrapper>
  </S.Wrapper>
)

export default memo(OverallGrid)
