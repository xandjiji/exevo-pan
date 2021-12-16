import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import { getFromLocalStorage } from 'utils'
import Sticker from '..'

jest.mock('utils')

describe('<Sticker />', () => {
  test('should be rendered if localStorage is empty', () => {
    ;(getFromLocalStorage as jest.Mock).mockReturnValue(true)

    renderWithProviders(
      <Sticker localStorageKey="myKey">
        <div role="none" />
      </Sticker>,
    )

    expect(screen.getByRole('none')).toBeInTheDocument()
  })

  test('should NOT be rendered if localStorage has its key', () => {
    ;(getFromLocalStorage as jest.Mock).mockReturnValue(false)

    renderWithProviders(
      <Sticker localStorageKey="myKey">
        <div role="none" />
      </Sticker>,
    )

    expect(screen.queryByRole('none')).not.toBeInTheDocument()
  })
})
