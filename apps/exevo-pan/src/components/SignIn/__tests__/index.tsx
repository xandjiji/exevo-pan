import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { AuthProviders } from 'types/next-auth'
import { getProviders, signIn } from 'next-auth/react'
import { renderWithProviders } from 'utils/test'
import SignIn from '..'

jest.mock('next-auth/react', () => ({
  getProviders: jest.fn(),
  signIn: jest.fn(),
}))

const mockedGetProviders = getProviders as jest.MockedFunction<
  typeof getProviders
>
const mockedSignIn = signIn as jest.MockedFunction<typeof signIn>

const providerItem: ValueOf<AuthProviders> = {
  name: '',
  callbackUrl: '',
  id: '',
  signinUrl: '',
  type: 'oauth',
}

const providers = {
  google: {
    ...providerItem,
    name: 'google',
  },
  discord: {
    ...providerItem,
    name: 'discord',
  },
} as AuthProviders

describe('<SignIn />', () => {
  beforeEach(() => {
    mockedGetProviders.mockClear()
  })

  test('passing `providers` props should prevent from fetching them', () => {
    renderWithProviders(<SignIn providers={providers} />)

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(mockedGetProviders).toHaveBeenCalledTimes(0)
  })

  test('should fetch for providers', async () => {
    mockedGetProviders.mockResolvedValueOnce(providers)
    renderWithProviders(<SignIn />)

    expect(screen.getByRole('alert')).toBeInTheDocument()

    const buttons = screen.getAllByRole('button')
    buttons.forEach((button) => expect(button).toBeDisabled())

    expect(await screen.findByRole('none'))
    buttons.forEach((button) => expect(button).toBeEnabled())

    expect(mockedGetProviders).toHaveBeenCalledTimes(1)
  })

  test('should handle error on fetching for providers', async () => {
    mockedGetProviders.mockRejectedValueOnce(providers)
    renderWithProviders(<SignIn />)

    expect(screen.getByRole('alert')).toBeInTheDocument()

    const buttons = screen.getAllByRole('button')
    buttons.forEach((button) => expect(button).toBeDisabled())

    expect(await screen.findByRole('none'))
    buttons.forEach((button) => expect(button).toBeEnabled())

    expect(mockedGetProviders).toHaveBeenCalledTimes(1)
  })

  test('the `state` prop should control its loading state', () => {
    const { rerender } = renderWithProviders(
      <SignIn providers={providers} state="LOADING" />,
    )

    expect(screen.getByRole('alert')).toBeInTheDocument()
    screen
      .getAllByRole('button')
      .forEach((button) => expect(button).toBeDisabled())

    rerender(<SignIn providers={providers} state="IDLE" />)

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    screen
      .getAllByRole('button')
      .forEach((button) => expect(button).toBeEnabled())
  })

  test('logging in should try to call `signIn()`', () => {
    mockedSignIn.mockResolvedValue({
      ok: true,
      error: '',
      status: 200,
      url: '',
    })
    renderWithProviders(<SignIn providers={providers} />)

    expect(mockedSignIn).toHaveBeenCalledTimes(0)

    userEvent.click(screen.getByRole('button', { name: 'Google' }))
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(mockedSignIn).toHaveBeenCalledTimes(1)
  })
})
