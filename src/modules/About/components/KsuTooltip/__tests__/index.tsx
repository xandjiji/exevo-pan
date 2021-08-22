import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import { mockCharacterData } from './mock'
import KsuTooltip from '..'

describe('<KsuTooltip />', () => {
  test('should render character data correctly', () => {
    renderWithProviders(<KsuTooltip characterData={mockCharacterData} />)
    const { name, level, vocation, world } = mockCharacterData.characters.data

    expect(screen.getByText(name)).toBeInTheDocument()

    expect(
      screen.getByText(`Level ${level} - ${vocation} (${world})`),
    ).toBeInTheDocument()
  })
})
