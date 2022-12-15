import { screen } from '@testing-library/react'
import { renderWithProviders, randomDataset } from 'utils/test'
import { common } from 'locales'
import SpecialTags from '..'

const { characterData } = randomDataset()
const characterList = characterData.slice(0, 10)

describe('<SpecialTags />', () => {
  test.each(characterList)('should render every special tag', (character) => {
    renderWithProviders(
      <SpecialTags data-testid="wrapper" character={character} />,
    )

    const { tags } = character

    const wrapperElement = screen.queryByTestId('wrapper')

    expect(wrapperElement?.children.length).toEqual(tags.length)
    if (tags.length) {
      expect(wrapperElement).toBeInTheDocument()
      tags.forEach((tag) => {
        expect(
          screen.getByText(
            common.en.SpecialTags[tag as keyof typeof common.en.SpecialTags] ??
              tag,
          ),
        ).toBeInTheDocument()
      })
    } else {
      expect(wrapperElement).not.toBeInTheDocument()
    }
  })
})
