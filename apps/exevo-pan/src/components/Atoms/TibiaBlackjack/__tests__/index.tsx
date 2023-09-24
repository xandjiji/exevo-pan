import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import { Banner } from '..'

describe('<Banner />', () => {
  test('should render correctly', () => {
    renderWithProviders(<Banner />)

    expect(screen.getByAltText('Tibia Blackjack')).toBeInTheDocument()
  })
})
