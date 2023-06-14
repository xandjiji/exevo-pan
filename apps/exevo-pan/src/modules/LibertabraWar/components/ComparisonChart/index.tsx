/* eslint-disable @typescript-eslint/ban-ts-comment */
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { memo, useMemo, useCallback } from 'react'
import { Line } from 'react-chartjs-2'
import { useTheme } from 'contexts/useTheme'
import { compactNumberFormatter, formatNumberWithCommas } from 'utils'
import styles from './styles.module.css'
import { ComparisonChartProps } from './types'

const colorA = '#118AB2'
const colorB = '#EF476F'

const GuildName = (args: JSX.IntrinsicElements['span']) => (
  <span className="text-s mb-1.5 block" {...args} />
)

const OnlineCount = (args: JSX.IntrinsicElements['span']) => (
  <span className="text-l block font-bold" {...args} />
)

const ComparisonChart = ({
  guildA,
  guildB,
  tooltipSuffix,
  dateLabelType,
  className,
  ...props
}: ComparisonChartProps) => {
  const { common } = useTranslations()

  const { colors } = useTheme()

  const formatDateLabel = useCallback(
    (timestamp: number, formatType: 'Time' | 'Date'): string => {
      const currentDate = new Date(timestamp)

      switch (formatType) {
        case 'Time': {
          const hours = currentDate.getHours().toString().padStart(2, '0')
          const minutes = currentDate.getMinutes().toString().padStart(2, '0')
          return `${hours}:${minutes}h`
        }

        case 'Date': {
          const day = currentDate.getDate().toString()
          const month = currentDate.getMonth() + 1
          const weekday = currentDate.getDay()

          return `${day}/${month}, ${
            common.Weekdays[weekday as unknown as keyof typeof common.Weekdays]
          }`
        }

        default:
          return currentDate.toLocaleString()
      }
    },
    [common],
  )

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
              fontColor: colors.onSurface,
              callback: (value: number) => compactNumberFormatter(value),
            },
            gridLines: {
              color: `${colors.separator}60`,
            },
          },
        ],
        displayColors: false,
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem: Record<string, number>) =>
            `${formatNumberWithCommas(tooltipItem.value)} ${tooltipSuffix}`,
        },
        displayColors: false,
      },
    }),
    [colors],
  )

  const chartDataObject = useMemo(
    () => ({
      labels: guildA.dataArray.map((snapshot) =>
        formatDateLabel(snapshot.timeStamp, dateLabelType),
      ),
      datasets: [
        {
          label: guildA.name,
          data: guildA.dataArray.map((snapshot) => snapshot.value),
          fill: false,
          backgroundColor: colorA,
          borderColor: colorA,
        },
        {
          label: guildB.name,
          data: guildB.dataArray.map((snapshot) => snapshot.value),
          fill: false,
          backgroundColor: colorB,
          borderColor: colorB,
        },
      ],
    }),
    [colors, guildA],
  )

  return (
    <section
      className={clsx(
        styles.wrapper,
        'card h-[500px] pt-5 pr-4 pb-[86px] pl-[26px] transition-colors',
        className,
      )}
      {...props}
    >
      <div className="child:text-onSurface mb-5 flex gap-6 md:gap-9">
        <div style={{ color: colorA }}>
          <GuildName>{guildA.name}</GuildName>
          <OnlineCount>{guildA.summaryValue}</OnlineCount>
        </div>

        <div style={{ color: colorB }}>
          <GuildName>{guildB.name}</GuildName>
          <OnlineCount>{guildB.summaryValue}</OnlineCount>
        </div>
      </div>

      {/* @ts-ignore */}
      <Line data={chartDataObject} options={options} />
    </section>
  )
}

export default memo(ComparisonChart)
