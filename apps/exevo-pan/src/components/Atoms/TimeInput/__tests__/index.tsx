import { screen } from '@testing-library/react'
import { renderWithProviders, assertNoA11yViolations } from 'utils/test'
import TimeInput from '..'

describe('<TimeInput />', () => {
  test('should be invalid', () => {
    renderWithProviders(<TimeInput label="Time" error="Invalid time" />)

    expect(screen.getByRole('alert')).toHaveTextContent('Invalid time')
  })

  test('should be controlled', () => {
    const { rerender } = renderWithProviders(
      <TimeInput label="Time" value="10:30" />,
    )

    const inputElement = screen.getByLabelText('Time')

    expect(inputElement).toHaveDisplayValue('10:30')

    rerender(<TimeInput label="Time" value="06:06" />)
    expect(inputElement).toHaveDisplayValue('06:06')
  })

  test('a11y', async () => {
    const { container } = renderWithProviders(<TimeInput label="Time" />)
    await assertNoA11yViolations(container)
  })
})
