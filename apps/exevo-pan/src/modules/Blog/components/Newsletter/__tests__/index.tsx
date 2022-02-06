import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import Newsletter from '..'

global.fetch = jest.fn()
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>

describe('<Newsletter />', () => {
  beforeEach(() => {
    mockedFetch.mockClear()
    mockedFetch.mockResolvedValue({
      json: async () => ({ message: 'success' }),
    } as Response)
  })

  test.todo('should make a resquest with the user data')

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
