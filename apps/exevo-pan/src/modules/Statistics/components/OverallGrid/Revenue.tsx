/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import clsx from 'clsx'
import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { useTheme } from 'contexts/useTheme'
import { formatNumberWithCommas } from 'utils'
import Summary from '../Chart/Summary'
import styles from './styles.module.css'
import basedata from './revenue.json'

const data = basedata
  .map(({ monthLabel, revenue }) => ({
    monthLabel,
    revenue,
  }))
  .reverse()
  .slice(0, basedata.length - 2)

export const Revenue = () => {
  const { colors } = useTheme()

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
            `${tooltipItem[0].xLabel}`,
          label: (tooltipItem: Record<string, number>) =>
            `Tibia Coins revenue: ${formatNumberWithCommas(
              tooltipItem.yLabel,
            )} TC`,
        },
        displayColors: false,
      },
    }),
    [colors],
  )

  const chartDataObject = useMemo(
    () => ({
      labels: data.map(({ monthLabel }) => monthLabel),
      datasets: [
        {
          label: 'Cipsoft TC Revenue',
          data: data.map(({ revenue }) => revenue),
          fill: false,
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        },
      ],
    }),
    [colors],
  )

  return (
    <section
      className={clsx(
        styles.wrapper,
        'card w-full py-5 pr-4 pl-[26px] transition-colors',
      )}
    >
      <Summary title="Cipsoft total revenue" value={251607871} percentage={0} />
      <div className="mt-4 h-[260px] w-full">
        {/* @ts-ignore */}
        <Line data={chartDataObject} options={options} />
      </div>
    </section>
  )
}
