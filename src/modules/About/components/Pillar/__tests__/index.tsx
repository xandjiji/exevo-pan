import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import { mockPillarSections } from './mock'
import Pillar from '..'

describe('<Pillar />', () => {
  test('should render all nav items correctly', () => {
    renderWithProviders(
      <main>
        <Pillar sections={mockPillarSections} />
      </main>,
    )

    mockPillarSections.forEach((sectionItem) => {
      const sectionElement = screen.getByText(`${sectionItem.title}.title`)

      expect(sectionElement).toBeInTheDocument()

      expect(sectionElement).toHaveAttribute('href', `#${sectionItem.id}`)
    })
  })
})
