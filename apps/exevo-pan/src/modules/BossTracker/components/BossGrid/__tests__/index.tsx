import { screen } from '@testing-library/react'
import { renderWithProviders, setup } from 'utils/test'
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

    expect(await screen.findByText('40.30%')).toBeInTheDocument()
  })

  test.todo('should sort grid correctly')

  test.todo('should display an empty state')

  test.todo('should open and close a dialog')

  test.todo('should try to pin a boss')
})
