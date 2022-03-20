import { screen } from '@testing-library/react'
import { renderWithProviders, setup } from 'utils/test'
import Sticker from '..'

const mockedGetFromLocalStorage = setup.getFromLocalStorage()

describe('<Sticker />', () => {
  test('should be rendered if localStorage is empty', () => {
    mockedGetFromLocalStorage.mockReturnValue(true)

    renderWithProviders(
      <Sticker localStorageKey="myKey">
        <div role="none" />
      </Sticker>,
    )

    expect(screen.getByRole('none')).toBeInTheDocument()
  })

  test('should NOT be rendered if localStorage has its key', () => {
    mockedGetFromLocalStorage.mockReturnValue(false)

    renderWithProviders(
      <Sticker localStorageKey="myKey">
        <div role="none" />
      </Sticker>,
    )

    expect(screen.queryByRole('none')).not.toBeInTheDocument()
  })
})
