import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, randomDataset, setup } from 'utils/test'
import { formatNumberWithCommas, calculateTotalInvestment } from 'utils'
import CharacterModal from '..'

const { characterData } = randomDataset()
const characterList = characterData.slice(0, 10)

const mockedFetch = setup.fetch()
const mockOnClose = jest.fn()

describe('<CharacterModal />', () => {
  beforeEach(() => {
    mockOnClose.mockClear()
    mockedFetch.mockClear()
    setup.setTimeout()
  })

  test.todo('should render every element correctly')

  test.todo('should render every element correctly')

  test('if a sprite is not found, it should call `NotifyErrorClient`', () => {
    const [character] = characterList

    expect(mockedFetch).toHaveBeenCalledTimes(0)

    renderWithProviders(
      <CharacterModal
        characterData={{
          ...character,
          outfits: [{ name: 'weird outfit', type: 0 }],
        }}
        onClose={mockOnClose}
      />,
    )

    expect(mockedFetch).toHaveBeenCalledTimes(1)
  })

  test('should call `onClose` handler', () => {
    const [character] = characterList
    renderWithProviders(
      <CharacterModal characterData={character} onClose={mockOnClose} />,
    )

    expect(mockOnClose).toHaveBeenCalledTimes(0)

    userEvent.click(screen.getByRole('button', { name: 'Close dialog' }))
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })
})
