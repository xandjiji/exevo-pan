import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import GuildXPGrid from '..'
import { mockWarStatistics } from './mock'

describe('<GuildXPGrid />', () => {
  test('should render correctly', () => {
    renderWithProviders(<GuildXPGrid warData={mockWarStatistics} />)

    expect(screen.getByRole('article')).toBeInTheDocument()
  })
})
