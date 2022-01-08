import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import EmptyState from '..'

describe('<EmptyState />', () => {
  test('should render correctly', () => {
    renderWithProviders(<EmptyState />)

    expect(screen.getByText('No auction was found')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAccessibleName('No auction was found')
  })
})
