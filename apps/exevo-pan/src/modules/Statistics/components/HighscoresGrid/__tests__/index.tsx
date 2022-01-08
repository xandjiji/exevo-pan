import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import HighscoresGrid from '..'
import { mockedStatisticsData } from './mock'

describe('<HighscoresGrid />', () => {
  test('should render correctly', () => {
    renderWithProviders(
      <HighscoresGrid
        data-testid="grid-element"
        statisticsData={mockedStatisticsData}
      />,
    )

    expect(screen.getByTestId('grid-element')).toBeInTheDocument()
  })
})
