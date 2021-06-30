import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { getFavArray, saveToLocalStorage } from 'utils'
import { renderWithProviders } from 'utils/test'
import FavButton from '..'

jest.mock('utils', () => ({
  getFavArray: jest.fn(),
  saveToLocalStorage: jest.fn(),
}))

const getFavArrayMock = getFavArray as jest.MockedFunction<typeof getFavArray>
const saveToLocalStorageMock = saveToLocalStorage as jest.MockedFunction<
  typeof saveToLocalStorage
>

const mockedCharacterObject = {
  id: 123456,
  nickname: 'Ksu',
  auctionEnd: 1624812300,
  currentBid: 9500,
  hasBeenBidded: false,
  outfitId: '130_0',
  serverId: 32,
  vocationId: 4,
  level: 607,
  skills: {
    magic: 104.41,
    club: 14.27,
    fist: 16.65,
    sword: 14.2,
    fishing: 10,
    axe: 12.49,
    distance: 13.13,
    shielding: 33.61,
  },
  items: [29423, 29426, 30400, 30403],
  charms: ['Freeze', 'Poison', 'Wound', 'Zap'],
  transfer: false,
  imbuements: [
    'Critical Hit',
    'Death Damage',
    'Death Protection',
    'Energy Damage',
    'Energy Protection',
    'Fire Damage',
    'Fire Protection',
    'Life Leech',
    'Magic Level',
    'Mana Leech',
    'Speed',
  ],
  hasSoulwar: true,
} as CharacterObject

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
          `Remove ${mockedCharacterObject.nickname} from favorites`,
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
          `Add ${mockedCharacterObject.nickname} to favorites`,
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
          `Add ${mockedCharacterObject.nickname} to favorites`,
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
      'initialFavCharacterData',
      [mockedCharacterObject],
    )

    getFavArrayMock.mockReturnValueOnce([mockedCharacterObject])
    userEvent.click(buttonElement)
    expect(buttonElement).toHaveAttribute('aria-pressed', 'false')
    expect(saveToLocalStorageMock).toBeCalledTimes(2)
    expect(saveToLocalStorageMock).toHaveBeenLastCalledWith(
      'initialFavCharacterData',
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
