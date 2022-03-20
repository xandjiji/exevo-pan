import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, randomDataset, setup } from 'utils/test'
import { formatNumberWithCommas, calculateTotalInvestment } from 'utils'
import CharacterModal from '..'

const { characterData } = randomDataset()
const characterList = characterData.slice(0, 10)

const mockOnClose = jest.fn()

describe('<CharacterModal />', () => {
  beforeEach(() => {
    mockOnClose.mockClear()
  })

  test.todo('should render every element correctly')

  test.todo('should render every element correctly')

  test.todo('if a sprite is not found, it should call `NotifyErrorClient`')

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
