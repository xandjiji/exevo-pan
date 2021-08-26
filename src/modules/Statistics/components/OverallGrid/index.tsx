import { useTranslation } from 'next-i18next'
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
  const { t } = useTranslation('statistics')

  return (
    <S.Wrapper {...props}>
      <S.PageTitle>{t('OverallGrid.title')}</S.PageTitle>
      <S.ChartWrapper>
        <Chart
          totalLabel={t('OverallGrid.Chart1.totalLabel')}
          yesterdayLabel={t('OverallGrid.Chart1.yesterdayLabel')}
          tooltipLabel={t('OverallGrid.Chart1.tooltipLabel')}
          chartData={statisticsData.totalTibiaCoins}
        />
        <Chart
          totalLabel={t('OverallGrid.Chart2.totalLabel')}
          yesterdayLabel={t('OverallGrid.Chart2.yesterdayLabel')}
          tooltipLabel={t('OverallGrid.Chart2.tooltipLabel')}
          chartData={statisticsData.totalRevenue}
        />
      </S.ChartWrapper>
      <S.ItemWrapper>
        <PercentageCard
          title={t('OverallGrid.PercentageCard1.title')}
          /* @ ToDo: change this assertion after backend refactor */
          percentage={statisticsData.successRate as unknown as number}
        />
        <PieChart
          title={t('OverallGrid.PieChart1.title')}
          pieDataSet={statisticsData.vocationPercentage}
        />
      </S.ItemWrapper>
    </S.Wrapper>
  )
}

export default memo(OverallGrid)
