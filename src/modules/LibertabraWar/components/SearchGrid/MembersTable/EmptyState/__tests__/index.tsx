import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import EmptyState from '..'

describe('<EmptyState />', () => {
  test('should render elements correctly', () => {
    renderWithProviders(<EmptyState />)
    expect(screen.getByRole('img')).toHaveAttribute(
      'alt',
      'No character was found',
    )
  })
})
