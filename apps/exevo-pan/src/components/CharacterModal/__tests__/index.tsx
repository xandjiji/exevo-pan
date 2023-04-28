import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, randomDataset, setup } from 'utils/test'
import { formatNumberWithCommas } from 'utils'
import CharacterModal from '..'
import { tabCounter } from '../utils'

const { characterData } = randomDataset()
const characterList = characterData.slice(0, 10)

const mockedFetch = setup.fetch()
const scrollIntoViewMock = setup.scrollIntoView()
const mockOnClose = jest.fn()

jest.mock('react-focus-lock', () => (props: JSX.IntrinsicElements['div']) => (
  <div {...props} />
))

describe('<CharacterModal />', () => {
  beforeEach(() => {
    mockedFetch.mockClear()
    scrollIntoViewMock.mockClear()
    mockOnClose.mockClear()
    setup.setTimeout()
  })

  test.each(characterList)(
    'should render every element correctly',
    (character) => {
      const {
        outfits,
        storeOutfits,
        mounts,
        storeMounts,
        storeItems,
        charms,
        charmInfo,
        hirelings,
        achievementPoints,
        bossPoints,
      } = character

      renderWithProviders(
        <CharacterModal characterData={character} onClose={mockOnClose} />,
      )

      const totalInvestment = formatNumberWithCommas(character.tcInvested)

      if (totalInvestment === '0') {
        expect(screen.queryByText(totalInvestment)).not.toBeInTheDocument()
      } else {
        expect(
          screen.getByText(`${totalInvestment} Tibia Coins`, { exact: false }),
        ).toBeInTheDocument()
      }

      expect(
        screen.getByText(
          `Outfits ${tabCounter(outfits.length, storeOutfits.length)}`,
          { exact: false },
        ),
      ).toBeInTheDocument()

      expect(
        screen.getByText(
          `Mounts ${tabCounter(mounts.length, storeMounts.length)}`,
          { exact: false },
        ),
      ).toBeInTheDocument()

      if (storeItems.length > 0) {
        expect(
          screen.getByText(`Store Items (${storeItems.length})`, {
            exact: false,
          }),
        ).toBeInTheDocument()
      } else {
        expect(
          screen.queryByText(`Store Items (${storeItems.length})`, {
            exact: false,
          }),
        ).not.toBeInTheDocument()
      }

      expect(screen.getByText('Charms:', { exact: false }).textContent).toEqual(
        `Charms: ${charms.length}/19 (${formatNumberWithCommas(
          charmInfo.total,
        )} total points,${formatNumberWithCommas(charmInfo.unspent)} unspent)`,
      )

      expect(
        screen.getByText(`Boss points: ${formatNumberWithCommas(bossPoints)}`, {
          exact: false,
        }),
      ).toBeInTheDocument()

      expect(
        screen.getByText('Hirelings:', { exact: false }).textContent,
      ).toEqual(
        `Hirelings: ${hirelings.count} (${hirelings.jobs}/4 jobs, ${hirelings.outfits} outfits)`,
      )

      expect(
        screen.getByText(
          `Achievement points: ${formatNumberWithCommas(achievementPoints)}`,
          {
            exact: false,
          },
        ),
      ).toBeInTheDocument()
    },
  )

  test('should call `onClose` handler', () => {
    const [character] = characterList
    renderWithProviders(
      <CharacterModal characterData={character} onClose={mockOnClose} />,
    )

    expect(mockOnClose).toHaveBeenCalledTimes(0)

    userEvent.click(screen.getAllByRole('button', { name: 'Close dialog' })[0])
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  test('should be tabbable', () => {
    const [character] = characterList
    renderWithProviders(
      <CharacterModal characterData={character} onClose={mockOnClose} />,
    )

    const [tab1, tab2] = screen.getAllByRole('tab')
    expect(scrollIntoViewMock).toHaveBeenCalledTimes(0)

    expect(tab1).toHaveAttribute('aria-selected', 'true')
    expect(tab2).toHaveAttribute('aria-selected', 'false')

    userEvent.click(tab2)
    expect(tab1).toHaveAttribute('aria-selected', 'false')
    expect(tab2).toHaveAttribute('aria-selected', 'true')
    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1)
  })

  test('should have a permalink copy button', () => {
    const [character] = characterList
    const { rerender } = renderWithProviders(
      <CharacterModal
        characterData={character}
        onClose={mockOnClose}
        permalink="permalink"
      />,
    )

    expect(
      screen.getByRole('button', {
        name: 'Copy to clipboard',
      }),
    ).toBeInTheDocument()

    rerender(<CharacterModal characterData={character} onClose={mockOnClose} />)

    expect(
      screen.queryByRole('button', {
        name: 'Copy to clipboard',
      }),
    ).not.toBeInTheDocument()
  })

  test('should have a permalink copy button', () => {
    const [character] = characterList
    const { rerender } = renderWithProviders(
      <CharacterModal
        characterData={character}
        onClose={mockOnClose}
        permalink="permalink"
      />,
    )

    expect(
      screen.getByRole('button', {
        name: 'Copy to clipboard',
      }),
    ).toBeInTheDocument()

    rerender(<CharacterModal characterData={character} onClose={mockOnClose} />)

    expect(
      screen.queryByRole('button', {
        name: 'Copy to clipboard',
      }),
    ).not.toBeInTheDocument()
  })
})
