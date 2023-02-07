import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, setup } from 'utils/test'
import ServerNavigation from '..'

const mockedUseRouter = {
  push: jest.fn(),
  events: { on: jest.fn(), off: jest.fn() },
}

setup.scrollIntoView()
setup.useRouter().mockReturnValue(mockedUseRouter as any)

describe('<ServerNavigation />', () => {
  test('should dispatch navigation events', () => {
    renderWithProviders(
      <ServerNavigation
        currentServer="Antica"
        serverOptions={[
          { name: 'Antica', value: 'Antica' },
          { name: 'Belobra', value: 'Belobra' },
        ]}
      />,
    )

    userEvent.click(screen.getByText('Antica'))

    expect(mockedUseRouter.push).toHaveBeenCalledTimes(0)

    userEvent.click(screen.getByText('Belobra'))
    expect(mockedUseRouter.push).toHaveBeenCalledTimes(1)
  })
})
