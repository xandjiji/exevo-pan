import userEvent from '@testing-library/user-event'
import { renderWithProviders, setup } from 'utils/test'
import Header from '..'

setup.useSession().mockReturnValue({
  data: null,
  status: 'unauthenticated',
} as any)

describe('<Header />', () => {
  test('aria-current should highlight the current page', () => {
    const { container } = renderWithProviders(<Header />)

    const [
      logo,
      currentAuctions,
      tracker,
      calculators,
      statistics,
      advertise,
      blog,
    ] = container.querySelectorAll('a')

    expect(logo).not.toHaveAttribute('aria-current', 'page')
    expect(currentAuctions).toHaveAttribute('aria-current', 'page')
    expect(tracker).not.toHaveAttribute('aria-current', 'page')
    expect(calculators).not.toHaveAttribute('aria-current', 'page')
    expect(statistics).not.toHaveAttribute('aria-current', 'page')
    expect(advertise).not.toHaveAttribute('aria-current', 'page')
    expect(blog).not.toHaveAttribute('aria-current', 'page')
  })

  test('should toggle menu open/close', () => {
    const { container } = renderWithProviders(<Header />)

    const menuToggle = container.querySelector('button')

    expect(menuToggle).not.toBeChecked()

    userEvent.click(menuToggle as HTMLElement)

    expect(menuToggle).toBeChecked()

    userEvent.click(menuToggle as HTMLElement)

    expect(menuToggle).not.toBeChecked()
  })
})
