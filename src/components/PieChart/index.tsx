/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useMemo } from 'react'
import { useTheme } from 'styled-components'
import { Doughnut } from 'react-chartjs-2'
import * as S from './styles'
import { PieChartProps } from './types'

const colorArray = ['#8338EC', '#FFD166', '#118AB2', '#06D6A0', '#EF476F']

const PieChart = ({ title, pieDataSet }: PieChartProps): JSX.Element => {
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
          label: (tooltipItem, data) => {
            const index: number = tooltipItem.index
            return `${data.labels[index]}: ${data.datasets[0].data[index]}%`
          },
        },
      },
    }),
    [colors],
  )

  const chartData = useMemo(
    () => ({
      labels: Object.keys(pieDataSet),
      datasets: [
        {
          label: title,
          /* @ ToDo: remove Number casting after useDatabase refactor */
          data: Object.keys(pieDataSet).map(item => Number(pieDataSet[item])),
          fill: false,
          backgroundColor: colorArray,
          borderColor: colorArray,
          borderWidth: 0,
        },
      ],
    }),
    [title, pieDataSet],
  )

  return (
    <S.Wrapper>
      <S.Title>{title}</S.Title>
      <S.ChartWrapper>
        <Doughnut data={chartData} options={options} />
      </S.ChartWrapper>
    </S.Wrapper>
  )
}
export default PieChart
