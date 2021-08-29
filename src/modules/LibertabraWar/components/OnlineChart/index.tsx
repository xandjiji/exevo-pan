import { memo, useMemo } from 'react'
import { useTheme } from 'styled-components'
import { Line } from 'react-chartjs-2'
import { formatDateLabel } from './utils'
import * as S from './styles'
import { OnlineChartProps } from './types'

const colorA = '#118AB2'
const colorB = '#EF476F'

const OnlineChart = ({
  guildA,
  guildB,
  ...props
}: OnlineChartProps): JSX.Element => {
  const { colors } = useTheme()

  const lastOnlineCountA = guildA.online[guildA.online.length - 1].count
  const lastOnlineCountB = guildB.online[guildB.online.length - 1].count

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
            `${tooltipItem.value} members online`,
        },
        displayColors: false,
      },
    }),
    [colors],
  )

  const chartDataObject = useMemo(
    () => ({
      labels: guildA.online.map((snapshot) =>
        formatDateLabel(snapshot.timeStamp),
      ),
      datasets: [
        {
          label: guildA.name,
          data: guildA.online.map((snapshot) => snapshot.count),
          fill: false,
          backgroundColor: colorA,
          borderColor: colorA,
        },
        {
          label: guildB.name,
          data: guildB.online.map((snapshot) => snapshot.count),
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

export default memo(OnlineChart)
