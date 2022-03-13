import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import Header from '..'

describe('<Header />', () => {
  test('should render all header items', () => {
    renderWithProviders(<Header />)

    expect(screen.getAllByRole('heading')).toHaveLength(4)
  })
})
