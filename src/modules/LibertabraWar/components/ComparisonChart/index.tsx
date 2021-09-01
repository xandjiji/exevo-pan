import { memo, useMemo } from 'react'
import { useTheme } from 'styled-components'
import { Line } from 'react-chartjs-2'
import { formatDateLabel } from './utils'
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
  const { colors } = useTheme()

  const lastOnlineCountA = guildA.dataArray[guildA.dataArray.length - 1].value
  const lastOnlineCountB = guildB.dataArray[guildB.dataArray.length - 1].value

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
            `${tooltipItem.value} ${tooltipSuffix}`,
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
          <S.OnlineCount>{lastOnlineCountA} online</S.OnlineCount>
        </S.GuildSummary>

        <S.GuildSummary style={{ color: colorB }}>
          <S.GuildName>{guildB.name}</S.GuildName>
          <S.OnlineCount>{lastOnlineCountB} online</S.OnlineCount>
        </S.GuildSummary>
      </S.SummaryWrapper>

      <Line data={chartDataObject} options={options} />
    </S.Wrapper>
  )
}

export default memo(ComparisonChart)
