import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import OverallGrid from '..'
import { mockedStatisticsData } from './mock'

describe('<OverallGrid />', () => {
  test('should render correctly', () => {
    renderWithProviders(
      <OverallGrid
        data-testid="grid-element"
        statisticsData={mockedStatisticsData}
      />,
    )

    expect(screen.getByTestId('grid-element')).toBeInTheDocument()
  })
})
