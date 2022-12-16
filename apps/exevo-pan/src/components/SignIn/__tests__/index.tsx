import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { AuthProviders } from 'types/next-auth'
import { renderWithProviders, setup } from 'utils/test'
import SignIn from '..'

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
  test('passing `providers` props should prevent from fetching them', () => {
    renderWithProviders(<SignIn providers={providers} />)

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  test.todo('should fetch for providers')

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

  test.todo('logging in should try to call `signIn()`')
})
