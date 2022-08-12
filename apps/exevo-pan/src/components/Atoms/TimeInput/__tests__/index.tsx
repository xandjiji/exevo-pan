import { useState, memo } from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, assertNoA11yViolations } from 'utils/test'
import TimeInput from '..'

const ControlledComponent: typeof TimeInput = memo((args) => {
  const [value, setValue] = useState('13:00')

  return (
    <TimeInput
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
})

describe('<TimeInput />', () => {
  test('should be invalid', () => {
    renderWithProviders(<TimeInput label="Time" error="Invalid time" />)

    expect(screen.getByRole('alert')).toHaveTextContent('Invalid time')
  })

  test.todo('the hour should be capped by `max` and `min` props')

  test('should be controlled (keyboard and arrow keys)', () => {
    renderWithProviders(<ControlledComponent label="Time" />)

    const inputElement = screen.getByLabelText('Time')

    expect(inputElement).toHaveValue('13:00')

    userEvent.type(inputElement, '66')
    expect(inputElement).toHaveValue('06:06')
  })

  test.todo('should control its own value (keyboard and arrow keys)')
})
