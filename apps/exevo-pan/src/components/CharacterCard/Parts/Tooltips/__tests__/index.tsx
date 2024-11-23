import { screen } from '@testing-library/react'
import { randomDataset, renderWithProviders } from 'utils/test'
import * as imbuement from 'data-dictionary/dist/dictionaries/imbuement'
import * as quest from 'data-dictionary/dist/dictionaries/quest'
import Lister from '../Lister'

const { characterData } = randomDataset()
const characterList = characterData.slice(0, 10)

describe('<Lister />', () => {
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
        const item = screen.getByText(name)
        if (active) {
          expect(item).not.toHaveClass('opacity-50')
        } else {
          expect(item).toHaveClass('opacity-50')
        }
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
        const item = screen.getByText(name)
        if (active) {
          expect(item).not.toHaveClass('opacity-50')
        } else {
          expect(item).toHaveClass('opacity-50')
        }
      })
    },
  )
})
