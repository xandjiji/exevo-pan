import { screen } from '@testing-library/react'
import { renderWithProviders, setup } from 'utils/test'
import userEvent from '@testing-library/user-event'
import { premiumYeti, bossesMock } from './mock'
import BossGrid from '..'

describe('<BossGrid />', () => {
  beforeEach(() => {
    setup.useSession().mockReturnValue({
      data: {
        user: {
          proStatus: false,
        },
      } as any,
      status: 'unauthenticated',
    })

    setup.fetch().mockResolvedValue({
      json: async () => [premiumYeti],
    } as Response)
  })

  test('should render every item', () => {
    renderWithProviders(<BossGrid bosses={bossesMock} server="Antica" />)

    bossesMock.forEach(({ name }) => {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    })
  })

  test('should hydrate premium data', async () => {
    setup.useSession().mockReturnValue({
      data: {
        user: {
          proStatus: true,
        },
      } as any,
      status: 'unauthenticated',
    })

    renderWithProviders(<BossGrid bosses={bossesMock} server="Antica" />)

    expect(screen.queryByText('40.30%')).not.toBeInTheDocument()
    expect(await screen.findByText('40.30%')).toBeInTheDocument()
  })

  test('should sort grid correctly', () => {
    renderWithProviders(<BossGrid bosses={bossesMock} server="Antica" />)

    userEvent.click(screen.getByRole('radio', { name: /last seen/gi }))

    const [yeti, zomba, apprentice, valorcrest] = screen.getAllByTitle(
      'Chance to spawn today',
    )

    expect(yeti).toHaveTextContent('Unknown')
    expect(zomba).toHaveTextContent('No chance')
    expect(apprentice).toHaveTextContent('24.70%')
    expect(valorcrest).toHaveTextContent('73.16%')
  })

  test('should display an empty state', () => {
    renderWithProviders(<BossGrid bosses={[]} server="Antica" />)

    expect(screen.getByText('No bosses')).toBeInTheDocument()
  })

  test('should open and close a dialog', () => {
    renderWithProviders(<BossGrid bosses={bossesMock} server="Antica" />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    userEvent.click(screen.getByRole('heading', { name: 'Yeti' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    userEvent.click(screen.getAllByRole('button', { name: 'Close dialog' })[0])
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
