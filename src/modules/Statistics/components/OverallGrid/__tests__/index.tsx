import { screen } from '@testing-library/react'
import { ManageDataClient } from 'services'
import { renderWithProviders } from 'utils/test'
import OverallGrid from '..'
import { mockedStatisticsData } from './mock'

describe('<OverallGrid />', () => {
  beforeEach(() => {
    jest
      .spyOn(ManageDataClient, 'fetchStatisticsData')
      .mockResolvedValueOnce(mockedStatisticsData)
  })

  test('should render correctly', () => {
    renderWithProviders(<OverallGrid data-testid="grid-element" />)

    expect(screen.getByTestId('grid-element')).toBeInTheDocument()
  })
})
