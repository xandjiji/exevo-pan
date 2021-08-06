import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import Chart from '..'

import { mockData } from './mock'

describe('<Chart />', () => {
  test('should render correctly', () => {
    renderWithProviders(
      <Chart
        totalLabel="Total volume"
        yesterdayLabel="Yesterday's volume"
        tooltipLabel="Tibia Coins volume"
        chartData={mockData}
      />,
    )

    expect(
      screen.getByRole('heading', {
        name: 'Total volume',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: "Yesterday's volume",
      }),
    ).toBeInTheDocument()
  })
})
