import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import userEvent from '@testing-library/user-event'
import TagButton from '..'

describe('<TagButton />', () => {
  test('should control its state by mouse hover', () => {
    renderWithProviders(<TagButton data-testid="test-element" />)

    const textElement = screen.getByText('Highlight your auction!')
    const wrapperElement = screen.getByTestId('test-element')

    expect(textElement).toHaveClass('opacity-0')
    userEvent.hover(wrapperElement)
    expect(textElement).not.toHaveClass('opacity-0')
    userEvent.unhover(wrapperElement)
    expect(textElement).toHaveClass('opacity-0')
  })

  test('should control its state by keyboard', () => {
    renderWithProviders(<TagButton data-testid="test-element" />)

    const textElement = screen.getByText('Highlight your auction!')

    expect(textElement).toHaveClass('opacity-0')
    userEvent.tab()
    userEvent.tab()
    expect(textElement).not.toHaveClass('opacity-0')
    userEvent.tab()
    expect(textElement).toHaveClass('opacity-0')
  })
})
