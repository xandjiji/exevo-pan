import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import SubHeader from '..'

const mockNavItems = [
  { title: 'Header Item A', href: 'hrefItemA', icon: <div role="none" /> },
  { title: 'Header Item B', href: 'hrefItemB', icon: <div role="none" /> },
]

describe('<SubHeader />', () => {
  test('should render all navigation items', () => {
    renderWithProviders(<SubHeader navItems={mockNavItems} />)

    screen.getAllByRole('heading').forEach((linkElement, index) => {
      expect(linkElement).toHaveTextContent(mockNavItems[index].title)
    })

    expect(screen.getAllByRole('none')).toHaveLength(mockNavItems.length)
  })
})
