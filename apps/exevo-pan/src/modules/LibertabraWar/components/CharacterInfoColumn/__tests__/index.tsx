import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import CharacterInfoColumn from '..'

describe('<CharacterInfoColumn />', () => {
  test('should render all content correctly', () => {
    renderWithProviders(
      <CharacterInfoColumn
        nickname="Master Ksu"
        level={400}
        vocation="Master Sorcerer"
      />,
    )

    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveTextContent('Master Ksu')
    expect(linkElement).toHaveAttribute(
      'href',
      'https://www.tibia.com/community/?name=Master Ksu',
    )
    expect(screen.getByText('Level 400 - Master Sorcerer')).toBeInTheDocument()
  })
})
