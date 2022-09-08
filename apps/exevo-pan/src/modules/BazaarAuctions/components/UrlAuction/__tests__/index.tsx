import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, randomDataset, setup } from 'utils/test'
import UrlAuction from '..'

const mockedFetch = setup.fetch()

const [mockedCharacterData] = randomDataset().characterData

describe('<UrlAuction />', () => {
  beforeEach(() => {
    mockedFetch.mockClear()
  })

  test('should fetch and render an auction', async () => {
    setup.URLSearchParams.get('123456')

    mockedFetch.mockResolvedValueOnce({
      json: async () => ({
        page: [mockedCharacterData],
        sortingMode: 0,
        descendingOrder: false,
      }),
    } as Response)

    renderWithProviders(<UrlAuction endpoint="endpoint" />)

    await waitFor(() =>
      expect(screen.getByText(/loading/gi)).toBeInTheDocument(),
    )
    await waitFor(() =>
      expect(screen.queryByText(/loading/gi)).not.toBeInTheDocument(),
    )
    await waitFor(() =>
      expect(
        screen.getByText(mockedCharacterData.nickname),
      ).toBeInTheDocument(),
    )

    userEvent.click(screen.getByRole('button', { name: 'Close dialog' }))
    await waitFor(() =>
      expect(
        screen.queryByText(mockedCharacterData.nickname),
      ).not.toBeInTheDocument(),
    )
  })

  test('shouldnt either fetch or render anything', () => {
    setup.URLSearchParams.get()

    renderWithProviders(<UrlAuction endpoint="endpoint" />)

    expect(screen.queryByText(/loading/gi)).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Close dialog' }),
    ).not.toBeInTheDocument()
  })
})
