import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, setup } from 'utils/test'
import Newsletter from '..'

const mockedFetch = setup.fetch()

describe.skip('<Newsletter />', () => {
  beforeEach(() => {
    mockedFetch.mockClear()
    mockedFetch.mockResolvedValue({
      json: async () => ({ message: 'success' }),
    } as Response)
  })

  test('should make a resquest with the user data', () => {
    renderWithProviders(<Newsletter />)

    userEvent.type(screen.getByLabelText('Email'), 'my@email.com')
    userEvent.keyboard('{enter}')

    const [[, payload]] = mockedFetch.mock.calls
    const body = JSON.parse((payload as any).body)
    expect(body.email).toEqual('my@email.com')
    expect(body.locale).toEqual('en')
  })

  test('should display success state', async () => {
    renderWithProviders(<Newsletter />)

    userEvent.type(screen.getByLabelText('Email'), 'my@email.com')
    userEvent.click(screen.getByRole('button', { name: /sign up/i }))

    expect(screen.getByRole('alert')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument()
    })
  })

  test('should display a generic error state', async () => {
    mockedFetch.mockRejectedValue({
      response: { json: async () => ({ message: 'ops!' }) },
    })

    renderWithProviders(<Newsletter />)

    userEvent.type(screen.getByLabelText('Email'), 'my@email.com')
    userEvent.click(screen.getByRole('button', { name: /sign up/i }))

    expect(screen.getByRole('alert')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    })
  })
})
