import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import KwaiVerticalBanner from '..'

describe('<KwaiVerticalBanner />', () => {
  test('should render correctly', () => {
    renderWithProviders(<KwaiVerticalBanner />)

    expect(screen.getByLabelText('Start now!')).toBeInTheDocument()
  })
})
