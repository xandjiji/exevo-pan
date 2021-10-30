import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter, NextRouter } from 'next/router'
import { renderWithProviders, randomDataset } from 'utils/test'
import { formatNumberWithCommas } from 'utils'
import { routes } from 'Constants'
import CharacterCard from '..'
import { vocationEnum } from './utils'

/*
    We are using 'await waitFor(() => {})' at the end
    of each test to get rid of unexpected warnings.
    This is a issue with react-popper. See:
    https://github.com/popperjs/react-popper/issues/368
*/

const { characterData } = randomDataset()
const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>

describe('<CharacterCard />', () => {
  test('should write every info correctly', async () => {
    const character = characterData[0]
    renderWithProviders(<CharacterCard characterData={character} />)

    expect(screen.getByText(character.nickname)).toBeInTheDocument()
    expect(
      screen.getByText(
        `Level ${character.level} - ${
          character.level >= 20
            ? vocationEnum[character.vocationId]
            : vocationEnum[`1${character.vocationId}`]
        }`,
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
      screen.getByText(`Imbuements: ${character.imbuements.length}/23`),
    ).toBeInTheDocument()

    userEvent.hover(screen.getByText(/Imbuements:/))
    character.imbuements.forEach((imbuement) => {
      expect(screen.getByText(imbuement)).toBeInTheDocument()
    })
    character.charms.forEach((charm) => {
      expect(screen.getByText(charm)).toBeInTheDocument()
    })

    await waitFor(() => {})
  })

  test(`should render a different bid label for ${routes.BAZAAR_HISTORY} route`, async () => {
    mockedUseRouter.mockReturnValue({
      pathname: routes.BAZAAR_HISTORY,
    } as NextRouter)
    const character = characterData[1]
    renderWithProviders(<CharacterCard characterData={character} />)
    expect(
      screen.getByText(
        character.hasBeenBidded ? 'Auction Successful' : 'Auction Failed',
      ),
    ).toBeInTheDocument()

    await waitFor(() => {})
  })

  test(`should render highlighted card correctly`, async () => {
    renderWithProviders(
      <CharacterCard characterData={characterData[0]} highlighted />,
    )

    expect(screen.getByText('Highlight your auction!')).toBeInTheDocument()
  })
})
