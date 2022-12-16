import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import locales from 'locales/en/calculators'
import { routes } from '../../../routes'
import MainPage from '..'

const [main, ...pages] = routes

describe('<MainPage />', () => {
  test('should render all routess', () => {
    renderWithProviders(<MainPage />)

    screen.getAllByRole('heading').forEach((element, index) => {
      expect(element).toHaveTextContent(
        locales.Header[pages[index].title as keyof typeof locales.Header],
      )
    })
  })
})
