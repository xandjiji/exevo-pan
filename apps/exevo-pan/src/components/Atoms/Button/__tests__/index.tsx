import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, assertNoA11yViolations } from 'utils/test'
import Button from '..'

const mockOnClick = jest.fn()

describe('<Button />', () => {
  beforeEach(() => {
    mockOnClick.mockReset()
  })

  test('should render its contents correctly', () => {
    renderWithProviders(<Button type="button">test button</Button>)

    expect(
      screen.getByRole('button', { name: 'test button' }),
    ).toBeInTheDocument()
  })

  test('should inherit button behaviors', () => {
    const { rerender } = renderWithProviders(
      <Button type="button" disabled onClick={mockOnClick}>
        test button
      </Button>,
    )

    const buttonElement = screen.getByRole('button')

    userEvent.click(buttonElement)
    expect(mockOnClick).toHaveBeenCalledTimes(0)

    rerender(
      <Button type="button" onClick={mockOnClick}>
        test button
      </Button>,
    )

    userEvent.click(buttonElement)
    expect(mockOnClick).toHaveBeenCalledTimes(1)

    userEvent.keyboard('{space}')
    expect(mockOnClick).toHaveBeenCalledTimes(2)
  })

  test('a11y', async () => {
    const { container } = renderWithProviders(
      <Button type="button">test button</Button>,
    )
    await assertNoA11yViolations(container)
  })
})
