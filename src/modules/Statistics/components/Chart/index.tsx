/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useTranslations } from 'contexts/useTranslation'
import { memo, useState, useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { Chip } from 'components/Atoms'
import { useTheme } from 'styled-components'
import { formatNumberWithCommas, fillArrayUntil } from 'utils'
import Summary from './Summary'
import * as S from './styles'
import { ChartProps } from './types'

const Chart = ({
  totalLabel,
  yesterdayLabel,
  tooltipLabel,
  chartData,
  ...props
}: ChartProps): JSX.Element => {
  const {
    translations: { statistics, common },
  } = useTranslations()

  const { colors } = useTheme()

  const [dataSize, setDataSize] = useState(7)

  const { current, lastMonth: originalLastMonth } = chartData
  const lastMonth = useMemo(
    () => fillArrayUntil(originalLastMonth, 28),
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
            common.Weekdays[date.getDay()]
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
    <S.Wrapper {...props}>
      <S.SummaryWrapper>
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
      </S.SummaryWrapper>

      <S.ChartWrapper>
        <Line data={chartDataObject} options={options} />
      </S.ChartWrapper>

      <S.ChipWrapper>
        <Chip overrideStatus={dataSize === 28} onClick={() => setDataSize(28)}>
          28 {statistics.Days}
        </Chip>
        <Chip overrideStatus={dataSize === 7} onClick={() => setDataSize(7)}>
          7 {statistics.Days}
        </Chip>
      </S.ChipWrapper>
    </S.Wrapper>
  )
}

export default memo(Chart)
