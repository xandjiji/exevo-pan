import { screen } from '@testing-library/react'
import { renderWithProviders, assertNoA11yViolations } from 'utils/test'
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

  test('a11y', async () => {
    const { container } = renderWithProviders(
      <MagicButton aria-label="this is a magic button">content</MagicButton>,
    )
    await assertNoA11yViolations(container)
  })
})
