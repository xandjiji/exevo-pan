import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import Top10Grid from '..'
import { mockWarStatistics } from './mock'

describe('<GuildXPGrid />', () => {
  test('should render correctly', () => {
    renderWithProviders(<Top10Grid warData={mockWarStatistics} />)

    expect(screen.getByRole('article')).toBeInTheDocument()
  })
})
