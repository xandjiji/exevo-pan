import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import locales from 'locales/en/calculators'
import { routes } from '../../../routes'
import Header from '..'

describe('<Header />', () => {
  test('should render all navigation items', () => {
    renderWithProviders(<Header />)

    screen.getAllByRole('heading').forEach((linkElement, index) => {
      expect(linkElement).toHaveTextContent(
        locales.Header[routes[index].title as keyof typeof locales.Header],
      )
    })
  })
})
