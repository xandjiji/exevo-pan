import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { getFavArray, saveToLocalStorage } from 'utils'
import { renderWithProviders } from 'utils/test'
import { localStorageKeys } from 'Constants'
import FavButton from '..'
import { mockedCharacterObject } from './mock'

jest.mock('utils', () => ({
  getFavArray: jest.fn(),
  saveToLocalStorage: jest.fn(),
}))

const getFavArrayMock = getFavArray as jest.MockedFunction<typeof getFavArray>
const saveToLocalStorageMock = saveToLocalStorage as jest.MockedFunction<
  typeof saveToLocalStorage
>

describe('<FavButton />', () => {
  beforeEach(() => {
    getFavArrayMock.mockReset()
    saveToLocalStorageMock.mockReset()
  })

  describe('lazy state initialization should work correctly', () => {
    test('if the character IS favorited, it should render with an ACTIVE button', () => {
      getFavArrayMock.mockReturnValueOnce([mockedCharacterObject])
      renderWithProviders(<FavButton characterObject={mockedCharacterObject} />)

      expect(
        screen.getByLabelText(
          `CharacterCard.favButton.remove ${mockedCharacterObject.nickname} CharacterCard.favButton.fromFav`,
        ),
      ).toBeInTheDocument()
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
    })

    test('if the character ISNT favorited, it should render with an INACTIVE button', () => {
      getFavArrayMock.mockReturnValueOnce([
        { ...mockedCharacterObject, id: 987654 },
      ])
      renderWithProviders(<FavButton characterObject={mockedCharacterObject} />)

      expect(
        screen.getByLabelText(
          `CharacterCard.favButton.add ${mockedCharacterObject.nickname} CharacterCard.favButton.toFav`,
        ),
      ).toBeInTheDocument()
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-pressed',
        'false',
      )
    })

    test('if there are no favorited characters, it should render with an INACTIVE button', () => {
      getFavArrayMock.mockReturnValueOnce([])
      renderWithProviders(<FavButton characterObject={mockedCharacterObject} />)

      expect(
        screen.getByLabelText(
          `CharacterCard.favButton.add ${mockedCharacterObject.nickname} CharacterCard.favButton.toFav`,
        ),
      ).toBeInTheDocument()
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-pressed',
        'false',
      )
    })
  })

  test('should toggle correctly', () => {
    getFavArrayMock.mockReturnValue([])
    renderWithProviders(<FavButton characterObject={mockedCharacterObject} />)

    const buttonElement = screen.getByRole('button')

    expect(buttonElement).toHaveAttribute('aria-pressed', 'false')

    userEvent.click(buttonElement)
    expect(buttonElement).toHaveAttribute('aria-pressed', 'true')
    expect(saveToLocalStorageMock).toBeCalledTimes(1)
    expect(saveToLocalStorageMock).toHaveBeenLastCalledWith(
      localStorageKeys.FAV_CHARACTER_DATA,
      [mockedCharacterObject],
    )

    getFavArrayMock.mockReturnValueOnce([mockedCharacterObject])
    userEvent.click(buttonElement)
    expect(buttonElement).toHaveAttribute('aria-pressed', 'false')
    expect(saveToLocalStorageMock).toBeCalledTimes(2)
    expect(saveToLocalStorageMock).toHaveBeenLastCalledWith(
      localStorageKeys.FAV_CHARACTER_DATA,
      [],
    )
  })

  test('keyboard navigation should toggle the button', () => {
    getFavArrayMock.mockReturnValue([])
    renderWithProviders(<FavButton characterObject={mockedCharacterObject} />)

    const buttonElement = screen.getByRole('button')

    expect(buttonElement).toHaveAttribute('aria-pressed', 'false')

    userEvent.tab()
    userEvent.keyboard('{enter}')
    expect(buttonElement).toHaveAttribute('aria-pressed', 'true')
    expect(saveToLocalStorageMock).toBeCalledTimes(1)

    getFavArrayMock.mockReturnValueOnce([mockedCharacterObject])
    userEvent.keyboard('{enter}')
    expect(buttonElement).toHaveAttribute('aria-pressed', 'false')
    expect(saveToLocalStorageMock).toBeCalledTimes(2)
  })
})
