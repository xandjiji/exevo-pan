import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import OverallGrid from '..'
import { mockWarStatistics } from './mock'

describe('<OverallGrid />', () => {
  test('should render correctly', () => {
    renderWithProviders(<OverallGrid warData={mockWarStatistics} />)

    expect(screen.getByRole('article')).toBeInTheDocument()
  })
})
