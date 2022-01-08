import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import Footer from '..'

const currentYear = new Date().getFullYear().toString()

describe('<Footer />', () => {
  test('should render year correctly', () => {
    renderWithProviders(<Footer />)

    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument()
  })
})
