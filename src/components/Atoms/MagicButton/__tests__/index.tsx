import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import MagicButton from '..'

describe('<MagicButton />', () => {
  test('should render all content correctly', () => {
    renderWithProviders(
      <MagicButton aria-label="this is a magic button">content</MagicButton>,
    )

    expect(
      screen.getByRole('button', { name: 'this is a magic button' }),
    ).toBeInTheDocument()
    expect(screen.getByText('content')).toBeInTheDocument()
  })
})
