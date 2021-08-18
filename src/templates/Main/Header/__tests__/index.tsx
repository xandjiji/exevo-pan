import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import Header from '..'

/* @ ToDo: enable these tests once there is a solution for testing navigation with next/link */
describe('<Header />', () => {
  /* test('aria-current should highlight the current page', () => {
    renderWithProviders(<Header />)

    const [logo, currentAuctions, bazaarHistory, statistics] =
      screen.getAllByRole('link')

    expect(logo).not.toHaveAttribute('aria-current', 'page')
    expect(currentAuctions).toHaveAttribute('aria-current', 'page')

    userEvent.click(bazaarHistory)
    expect(bazaarHistory).toHaveAttribute('aria-current', 'page')

    userEvent.click(statistics)
    expect(statistics).toHaveAttribute('aria-current', 'page')

    userEvent.click(logo)
    expect(logo).not.toHaveAttribute('aria-current', 'page')
    expect(currentAuctions).toHaveAttribute('aria-current', 'page')
  }) */

  test('should change routes on navigation', () => {
    renderWithProviders(<Header />)

    const [logo, currentAuctions, bazaarHistory, statistics] =
      screen.getAllByRole('link')

    expect(window.location.pathname).toBe('/')

    /* userEvent.click(bazaarHistory)
    expect(window.location.pathname).toBe('/bazaar-history')

    userEvent.click(currentAuctions)
    expect(window.location.pathname).toBe('/')

    userEvent.click(statistics)
    expect(window.location.pathname).toBe('/statistics')

    userEvent.click(logo)
    expect(window.location.pathname).toBe('/') */
  })
})
