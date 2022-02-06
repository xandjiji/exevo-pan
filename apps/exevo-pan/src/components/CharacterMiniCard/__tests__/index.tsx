import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import { mockCharacterData } from './mock'
import CharacterMiniCard from '..'

describe('<CharacterMiniCard />', () => {
  test('should render all info correctly', () => {
    renderWithProviders(
      <CharacterMiniCard
        linkUrl="character.html"
        characterData={mockCharacterData}
      />,
    )
    const { name, level, vocation } = mockCharacterData

    expect(screen.getByText(name)).toBeInTheDocument()

    expect(screen.getByText(`Level ${level} - ${vocation}`)).toBeInTheDocument()
  })

  test('should render with server data', () => {
    renderWithProviders(
      <CharacterMiniCard
        linkUrl="character.html"
        characterData={mockCharacterData}
        displayServer
      />,
    )
    const { name, level, vocation, world } = mockCharacterData

    expect(screen.getByText(name)).toBeInTheDocument()

    expect(
      screen.getByText(`Level ${level} - ${vocation} (${world})`),
    ).toBeInTheDocument()
  })

  test('should render with link', () => {
    renderWithProviders(
      <CharacterMiniCard
        linkUrl="character.html"
        characterData={mockCharacterData}
        displayLink
      />,
    )

    expect(
      screen.getByRole('link', { name: 'Go to character page' }),
    ).toBeInTheDocument()
  })

  test('should render forced subtitle', () => {
    renderWithProviders(
      <CharacterMiniCard
        linkUrl="character.html"
        characterData={mockCharacterData}
        forceSubtitle="This is a forced subtitle"
      />,
    )

    expect(screen.getByText('This is a forced subtitle')).toBeInTheDocument()
  })
})
