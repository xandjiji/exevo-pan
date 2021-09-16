import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import CharacterTable from '..'
import { mockCharacterList } from './mock'

describe('<CharacterTable />', () => {
  test('should render all items correctly', () => {
    renderWithProviders(
      <CharacterTable
        characterList={mockCharacterList}
        caption="table caption"
      />,
    )

    screen.getAllByTitle('Total kills').forEach((killElement, index) => {
      expect(killElement).toHaveTextContent(
        mockCharacterList[index].kills.toString(),
      )
    })

    screen.getAllByTitle('Total death count').forEach((deathElement, index) => {
      expect(deathElement).toHaveTextContent(
        mockCharacterList[index].deathCount.toString(),
      )
    })

    screen.getAllByRole('link').forEach((linkElement, index) => {
      expect(linkElement).toHaveTextContent(mockCharacterList[index].nickname)
    })
  })
})
