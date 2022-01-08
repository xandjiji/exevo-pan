/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useRef, useMemo, memo } from 'react'
import { useTheme } from 'styled-components'
import { Doughnut } from 'react-chartjs-2'
import { v4 as uuidv4 } from 'uuid'
import { capitalizeFirstLetter } from 'utils'
import * as S from './styles'
import { PieChartProps } from './types'

const chartColors = ['#8338EC', '#FFD166', '#118AB2', '#06D6A0', '#EF476F']

const PieChart = ({ title, pieDataSet }: PieChartProps): JSX.Element => {
  const { current: titleId } = useRef(uuidv4())
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
    <S.Wrapper>
      <S.Title id={titleId}>{title}</S.Title>
      <S.ChartWrapper aria-describedby={titleId}>
        <Doughnut data={chartData} options={options} />
      </S.ChartWrapper>
    </S.Wrapper>
  )
}
export default memo(PieChart)
