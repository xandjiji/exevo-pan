import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import { Banner, FloatingButton } from '..'

describe('<Banner />', () => {
  test('should render correctly', () => {
    renderWithProviders(<Banner />)

    expect(screen.getByAltText('Tibia Blackjack')).toBeInTheDocument()
  })
})

describe('<FloatingButton />', () => {
  test('should render correctly', () => {
    renderWithProviders(<FloatingButton />)

    expect(screen.getByAltText('Tibia Blackjack')).toBeInTheDocument()
    expect(screen.getByText('Play Tibia Blackjack')).toBeInTheDocument()
  })
})
