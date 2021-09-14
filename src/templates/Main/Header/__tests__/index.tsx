import { renderWithProviders } from 'utils/test'
import Header from '..'

describe('<Header />', () => {
  test('aria-current should highlight the current page', () => {
    const { container } = renderWithProviders(<Header />)

    const [logo, currentAuctions, bazaarHistory, statistics, war, about] =
      container.querySelectorAll('a')

    expect(logo).not.toHaveAttribute('aria-current', 'page')
    expect(currentAuctions).toHaveAttribute('aria-current', 'page')
    expect(bazaarHistory).not.toHaveAttribute('aria-current', 'page')
    expect(statistics).not.toHaveAttribute('aria-current', 'page')
    expect(war).not.toHaveAttribute('aria-current', 'page')
    expect(about).not.toHaveAttribute('aria-current', 'page')
  })
})
