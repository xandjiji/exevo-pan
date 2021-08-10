import { screen } from '@testing-library/react'
import { ManageDataClient } from 'services'
import { renderWithProviders } from 'utils/test'
import HighscoresGrid from '..'
import { mockedStatisticsData } from './mock'

describe('<HighscoresGrid />', () => {
  beforeEach(() => {
    jest
      .spyOn(ManageDataClient, 'fetchStatisticsData')
      .mockResolvedValueOnce(mockedStatisticsData)
  })

  test('should render correctly', () => {
    renderWithProviders(<HighscoresGrid data-testid="grid-element" />)

    expect(screen.getByTestId('grid-element')).toBeInTheDocument()
  })
})
