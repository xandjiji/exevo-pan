import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, randomDataset, setup } from 'utils/test'
import UrlAuction from '..'

const [mockedCharacterData] = randomDataset().characterData

describe.skip('<UrlAuction />', () => {
  test('should fetch and render an auction', async () => {
    setup.URLSearchParams.get('123456')

    /* mockedFetch.mockResolvedValueOnce({
      json: async () => mockedCharacterData,
    } as Response) */

    renderWithProviders(<UrlAuction />)

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

    const [closeButton] = screen.getAllByRole('button', {
      name: 'Close dialog',
    })
    userEvent.click(closeButton)
    await waitFor(() =>
      expect(
        screen.queryByText(mockedCharacterData.nickname),
      ).not.toBeInTheDocument(),
    )
  })

  test('shouldnt either fetch or render anything', () => {
    setup.URLSearchParams.get()

    renderWithProviders(<UrlAuction />)

    expect(screen.queryByText(/loading/gi)).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Close dialog' }),
    ).not.toBeInTheDocument()
  })

  test.todo('test for highlighted data hydration (tcInvested)')
})
