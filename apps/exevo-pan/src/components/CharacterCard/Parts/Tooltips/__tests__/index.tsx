import { screen } from '@testing-library/react'
import { renderWithProviders, randomDataset } from 'utils/test'
import * as imbuement from 'data-dictionary/dist/dictionaries/imbuement'
import * as charm from 'data-dictionary/dist/dictionaries/charm'
import * as quest from 'data-dictionary/dist/dictionaries/quest'
import Lister from '../Lister'

const { characterData } = randomDataset()
const characterList = characterData.slice(0, 10)

describe('<Lister />', () => {
  test.each(characterList)(
    'should render all items for Charms',
    ({ charms }) => {
      const set = new Set(charms)
      const fullList = charm.tokens

      renderWithProviders(<Lister fullList={fullList} partialList={charms} />)

      fullList.forEach((name) => {
        const active = set.has(name)
        expect(screen.getByText(name)).toHaveStyle(
          `opacity: ${active ? '1' : '0.5'}`,
        )
      })
    },
  )

  test.each(characterList)(
    'should render all items for Imbuements',
    ({ imbuements }) => {
      const set = new Set(imbuements)
      const fullList = imbuement.tokens

      renderWithProviders(
        <Lister fullList={fullList} partialList={imbuements} />,
      )

      fullList.forEach((name) => {
        const active = set.has(name)
        expect(screen.getByText(name)).toHaveStyle(
          `opacity: ${active ? '1' : '0.5'}`,
        )
      })
    },
  )

  test.each(characterList)(
    'should render all items for Quests',
    ({ quests }) => {
      const set = new Set(quests)
      const fullList = quest.tokens

      renderWithProviders(<Lister fullList={fullList} partialList={quests} />)

      fullList.forEach((name) => {
        const active = set.has(name)
        expect(screen.getByText(name)).toHaveStyle(
          `opacity: ${active ? '1' : '0.5'}`,
        )
      })
    },
  )
})
