import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { memo } from 'react'
import Chart from '../Chart'
import PieChart from '../PieChart'
import PercentageCard from '../PercentageCard'
import { OverallGridProps } from './types'

const OverallGrid = ({
  overallData,
  className,
  ...props
}: OverallGridProps) => {
  const { statistics } = useTranslations()

  return (
    <div
      className={clsx(
        'inner-container grid gap-4 overflow-hidden py-4',
        className,
      )}
      {...props}
    >
      <h2 className="hidden">{statistics.OverallGrid.title}</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Chart
          totalLabel={statistics.OverallGrid.Chart1.totalLabel}
          yesterdayLabel={statistics.OverallGrid.Chart1.yesterdayLabel}
          tooltipLabel={statistics.OverallGrid.Chart1.tooltipLabel}
          chartData={overallData.totalTibiaCoins}
        />
        <Chart
          totalLabel={statistics.OverallGrid.Chart2.totalLabel}
          yesterdayLabel={statistics.OverallGrid.Chart2.yesterdayLabel}
          tooltipLabel={statistics.OverallGrid.Chart2.tooltipLabel}
          chartData={overallData.totalRevenue}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-[240px_1fr]">
        <PercentageCard
          title={statistics.OverallGrid.PercentageCard1.title}
          percentage={overallData.successRate}
        />
        <PieChart
          title={statistics.OverallGrid.PieChart1.title}
          pieDataSet={overallData.vocationPercentage}
        />
      </div>
    </div>
  )
}

export default memo(OverallGrid)
