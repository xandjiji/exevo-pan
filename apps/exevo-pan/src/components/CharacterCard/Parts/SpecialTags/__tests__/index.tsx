import { screen } from '@testing-library/react'
import { renderWithProviders, randomDataset } from 'utils/test'
import { common } from 'locales'
import SpecialTags from '..'
import { getCharacterTags } from '../utils'

const { characterData } = randomDataset()
const characterList = characterData.slice(0, 10)

describe('<SpecialTags />', () => {
  test.each(characterList)('should render every special tag', (character) => {
    renderWithProviders(
      <SpecialTags data-testid="wrapper" character={character} />,
    )

    const tags = getCharacterTags(character)

    const wrapperElement = screen.queryByTestId('wrapper')
    if (tags.length) {
      expect(wrapperElement).toBeInTheDocument()
      tags.forEach((tag) => {
        expect(
          screen.getByText(
            common.en.CharacterCard.SpecialTags[
              tag as keyof typeof common.en.CharacterCard.SpecialTags
            ] ?? tag,
          ),
        ).toBeInTheDocument()
      })
    } else {
      expect(wrapperElement).not.toBeInTheDocument()
    }
  })
})
