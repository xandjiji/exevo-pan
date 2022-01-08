import { useTranslations } from 'contexts/useTranslation'
import { memo } from 'react'
import Chart from '../Chart'
import PieChart from '../PieChart'
import PercentageCard from '../PercentageCard'
import * as S from './styles'
import { OverallGridProps } from './types'

const OverallGrid = ({
  statisticsData,
  ...props
}: OverallGridProps): JSX.Element => {
  const {
    translations: { statistics },
  } = useTranslations()

  return (
    <S.Wrapper {...props}>
      <S.PageTitle>{statistics.OverallGrid.title}</S.PageTitle>
      <S.ChartWrapper>
        <Chart
          totalLabel={statistics.OverallGrid.Chart1.totalLabel}
          yesterdayLabel={statistics.OverallGrid.Chart1.yesterdayLabel}
          tooltipLabel={statistics.OverallGrid.Chart1.tooltipLabel}
          chartData={statisticsData.totalTibiaCoins}
        />
        <Chart
          totalLabel={statistics.OverallGrid.Chart2.totalLabel}
          yesterdayLabel={statistics.OverallGrid.Chart2.yesterdayLabel}
          tooltipLabel={statistics.OverallGrid.Chart2.tooltipLabel}
          chartData={statisticsData.totalRevenue}
        />
      </S.ChartWrapper>
      <S.ItemWrapper>
        <PercentageCard
          title={statistics.OverallGrid.PercentageCard1.title}
          percentage={statisticsData.successRate}
        />
        <PieChart
          title={statistics.OverallGrid.PieChart1.title}
          pieDataSet={statisticsData.vocationPercentage}
        />
      </S.ItemWrapper>
    </S.Wrapper>
  )
}

export default memo(OverallGrid)
