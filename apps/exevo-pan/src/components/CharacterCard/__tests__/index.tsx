import { screen } from '@testing-library/react'
import { useRouter, NextRouter } from 'next/router'
import { renderWithProviders, randomDataset } from 'utils/test'
import { formatNumberWithCommas } from 'utils'
import * as imbuement from 'data-dictionary/dist/dictionaries/imbuement'
import * as charm from 'data-dictionary/dist/dictionaries/charm'
import * as quest from 'data-dictionary/dist/dictionaries/quest'
import { vocation } from 'shared-utils/dist/vocations'
import { routes } from 'Constants'
import CharacterCard from '..'

const { characterData } = randomDataset()
const characterList = characterData.slice(0, 10)

const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>

describe('<CharacterCard />', () => {
  test.each(characterList)('should write every info correctly', (character) => {
    renderWithProviders(<CharacterCard characterData={character} />)

    expect(screen.getByText(character.nickname)).toBeInTheDocument()

    expect(
      screen.getByText(
        `Level ${character.level} - ${vocation.getFullName(
          character.vocationId,
          character.level,
        )}`,
      ),
    ).toBeInTheDocument()

    expect(
      screen.getByAltText(character.serverData.serverLocation.string),
    ).toBeInTheDocument()

    expect(
      screen.getByText(character.serverData.serverName),
    ).toBeInTheDocument()

    expect(
      screen.getByLabelText(
        character.transfer
          ? 'Regular World Transfer available'
          : 'Regular World Transfer NOT available',
      ),
    ).toBeInTheDocument()

    expect(
      screen.getByText(character.serverData.pvpType.string),
    ).toBeInTheDocument()

    expect(
      screen.getByText(character.hasBeenBidded ? 'Current Bid' : 'Minimum Bid'),
    ).toBeInTheDocument()

    expect(
      screen.getByText(formatNumberWithCommas(character.currentBid)),
    ).toBeInTheDocument()

    expect(screen.queryAllByAltText('Featured item')).toHaveLength(
      character.items.length,
    )

    expect(
      screen.getByText(
        `Imbuements: ${character.imbuements.length}/${imbuement.tokens.length}`,
      ),
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        `Charms: ${character.charms.length}/${charm.tokens.length}`,
      ),
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        `Quests: ${character.quests.length}/${quest.tokens.length}`,
      ),
    ).toBeInTheDocument()
  })

  test.each(characterList)(
    `should render a different bid label for ${routes.BAZAAR_HISTORY} route`,
    (character) => {
      mockedUseRouter.mockReturnValue({
        pathname: routes.BAZAAR_HISTORY,
      } as NextRouter)

      renderWithProviders(<CharacterCard characterData={character} />)
      expect(
        screen.getByText(
          character.hasBeenBidded ? 'Auction Successful' : 'Auction Failed',
        ),
      ).toBeInTheDocument()
    },
  )

  test.each(characterList)(
    `should render highlighted card correctly`,
    (character) => {
      renderWithProviders(
        <CharacterCard characterData={character} highlighted />,
      )

      expect(screen.getByText('Highlight your auction!')).toBeInTheDocument()
    },
  )
})
