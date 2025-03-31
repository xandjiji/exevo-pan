/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { memo, useId, useMemo } from 'react'
import clsx from 'clsx'
import { Doughnut } from 'react-chartjs-2'
import { useTheme } from 'contexts/useTheme'
import { capitalizeFirstLetter } from 'utils'
import { PieChartProps } from './types'

const chartColors = [
  '#000000',
  '#FFD166',
  '#118AB2',
  '#06D6A0',
  '#EF476F',
  '#8338EC',
]

const PieChart = ({
  title,
  pieDataSet,
  className,
  ...props
}: PieChartProps) => {
  const titleId = useId()
  const { colors } = useTheme()

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 400,
        easing: 'easeOutCubic',
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          fontColor: colors.onSurface,
          boxWidth: 12,
        },
      },
      tooltips: {
        displayColors: false,
        callbacks: {
          label: (
            tooltipItem: Record<string, number>,
            data: Record<string, Record<string, string>[]>,
          ) => {
            const { index } = tooltipItem
            return `${data.labels[index]}: ${data.datasets[0].data[index]}%`
          },
        },
      },
    }),
    [colors],
  )

  const chartData = useMemo(
    () => ({
      labels: Object.keys(pieDataSet).map(capitalizeFirstLetter),
      datasets: [
        {
          label: title,
          data: Object.keys(pieDataSet).map((item) => pieDataSet[item]),
          fill: false,
          backgroundColor: chartColors,
          borderColor: chartColors,
          borderWidth: 0,
        },
      ],
    }),
    [title, pieDataSet],
  )

  return (
    <section
      className={clsx('card p-5 transition-colors', className)}
      {...props}
    >
      <h4
        id={titleId}
        className="text-onSurface mb-2 text-center text-base font-light"
      >
        {title}
      </h4>
      <div aria-describedby={titleId} className="w-full">
        {/* @ts-ignore */}
        <Doughnut data={chartData} options={options} />
      </div>
    </section>
  )
}
export default memo(PieChart)
