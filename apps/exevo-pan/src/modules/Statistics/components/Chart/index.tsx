/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { memo, useState, useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { useTheme } from 'contexts/useTheme'
import { Chip } from 'components/Atoms'
import { formatNumberWithCommas, fillArrayUntil, DAYS_IN } from 'utils'
import Summary from './Summary'
import styles from './styles.module.css'
import { ChartProps } from './types'

const DAYS_IN_A_MONTH = DAYS_IN.WEEK * 4

const Chart = ({
  totalLabel,
  yesterdayLabel,
  tooltipLabel,
  chartData,
  className,
  ...props
}: ChartProps) => {
  const { statistics, common } = useTranslations()

  const { colors } = useTheme()

  const [dataSize, setDataSize] = useState(DAYS_IN.WEEK)

  const { current, lastMonth: originalLastMonth } = chartData
  const lastMonth = useMemo(
    () => fillArrayUntil(originalLastMonth, DAYS_IN_A_MONTH),
    [originalLastMonth],
  )
  const todayValue = lastMonth[lastMonth.length - 1]
  const yesterdayValue = lastMonth[lastMonth.length - 2]
  const dailyDifference = todayValue - yesterdayValue

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 400,
        easing: 'easeOutCubic',
      },
      elements: {
        line: {
          tension: 0,
        },
      },
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            ticks: {
              fontColor: colors.onSurface,
            },
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              callback: (value: number) => formatNumberWithCommas(value),
              fontColor: colors.onSurface,
            },
            gridLines: {
              color: `${colors.separator}60`,
            },
          },
        ],
      },
      tooltips: {
        callbacks: {
          title: (tooltipItem: Record<string, string>[]) =>
            `Day ${tooltipItem[0].xLabel}`,
          label: (tooltipItem: Record<string, number>) =>
            `${tooltipLabel}: ${formatNumberWithCommas(tooltipItem.yLabel)} TC`,
        },
        displayColors: false,
      },
    }),
    [colors, tooltipLabel],
  )

  const chartDataObject = useMemo(
    () => ({
      labels: lastMonth
        .slice(lastMonth.length - dataSize)
        .map((_, index) => {
          const date = new Date()
          date.setDate(date.getDate() - index)
          return `${date.getDate()}/${date.getMonth() + 1}, ${
            common.Weekdays[
              date.getDay() as unknown as keyof typeof common.Weekdays
            ]
          }`
        })
        .reverse(),
      datasets: [
        {
          label: tooltipLabel,
          data: lastMonth.slice(lastMonth.length - dataSize),
          fill: false,
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        },
      ],
    }),
    [colors, tooltipLabel, dataSize, lastMonth],
  )

  return (
    <section
      className={clsx(
        styles.wrapper,
        'card w-full py-5 pr-4 pl-[26px] transition-colors',
        className,
      )}
      {...props}
    >
      <div className="mb-5 flex items-center gap-12">
        <Summary
          title={totalLabel}
          value={current}
          percentage={(todayValue / (current - todayValue)) * 100}
        />
        <Summary
          title={yesterdayLabel}
          value={todayValue}
          percentage={(Math.abs(dailyDifference) / yesterdayValue) * 100}
          positive={dailyDifference > 0}
        />
      </div>

      <div className="h-[260px] w-full">
        {/* @ts-ignore */}
        <Line data={chartDataObject} options={options} />
      </div>

      <div className="mt-[22px] flex gap-2">
        <Chip
          overrideStatus={dataSize === DAYS_IN_A_MONTH}
          onClick={() => setDataSize(DAYS_IN_A_MONTH)}
        >
          {DAYS_IN_A_MONTH} {statistics.Days}
        </Chip>
        <Chip
          overrideStatus={dataSize === DAYS_IN.WEEK}
          onClick={() => setDataSize(DAYS_IN.WEEK)}
        >
          {DAYS_IN.WEEK} {statistics.Days}
        </Chip>
      </div>
    </section>
  )
}

export default memo(Chart)
