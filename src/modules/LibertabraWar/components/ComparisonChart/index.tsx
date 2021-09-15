import { useTranslations } from 'contexts/useTranslation'
import { memo, useMemo, useCallback } from 'react'
import { useTheme } from 'styled-components'
import { Line } from 'react-chartjs-2'
import { compactNumberFormatter, formatNumberWithCommas } from 'utils'
import * as S from './styles'
import { ComparisonChartProps } from './types'

const colorA = '#118AB2'
const colorB = '#EF476F'

const ComparisonChart = ({
  guildA,
  guildB,
  tooltipSuffix,
  dateLabelType,
  ...props
}: ComparisonChartProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

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

          return `${day}/${month}, ${common.Weekdays[weekday]}`
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
    <S.Wrapper {...props}>
      <S.SummaryWrapper>
        <S.GuildSummary style={{ color: colorA }}>
          <S.GuildName>{guildA.name}</S.GuildName>
          <S.OnlineCount>{guildA.summaryValue}</S.OnlineCount>
        </S.GuildSummary>

        <S.GuildSummary style={{ color: colorB }}>
          <S.GuildName>{guildB.name}</S.GuildName>
          <S.OnlineCount>{guildB.summaryValue}</S.OnlineCount>
        </S.GuildSummary>
      </S.SummaryWrapper>

      <Line data={chartDataObject} options={options} />
    </S.Wrapper>
  )
}

export default memo(ComparisonChart)
