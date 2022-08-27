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

  test('should be controlled', () => {
    renderWithProviders(<ControlledComponent label="Time" />)

    const inputElement = screen.getByLabelText('Time')
    const hoursElement = screen.getByLabelText('hours')
    const minutesElement = screen.getByLabelText('minutes')

    userEvent.type(hoursElement, '{arrowup}')
    expect(inputElement).toHaveValue('14:00')

    userEvent.type(minutesElement, '{arrowup}')
    expect(inputElement).toHaveValue('14:01')

    userEvent.click(hoursElement)
    expect(hoursElement).toHaveFocus()

    userEvent.keyboard('{arrowright}')
    expect(screen.getByLabelText('minutes')).toHaveFocus()
  })

  test('should control its own state', () => {
    renderWithProviders(<TimeInput label="Time" defaultValue="10:30" />)

    const inputElement = screen.getByLabelText('Time')
    const hoursElement = screen.getByLabelText('hours')
    const minutesElement = screen.getByLabelText('minutes')

    expect(inputElement).toHaveDisplayValue('10:30')

    userEvent.type(hoursElement, '{arrowdown}')
    expect(inputElement).toHaveValue('09:30')

    userEvent.type(minutesElement, '{arrowdown}')
    expect(inputElement).toHaveValue('09:29')
  })

  test('should cap its hours with `max` and `min` props', () => {
    renderWithProviders(
      <TimeInput label="Time" max={11} min={9} defaultValue="10:30" />,
    )

    const inputElement = screen.getByLabelText('Time')
    const hoursElement = screen.getByLabelText('hours')

    expect(inputElement).toHaveDisplayValue('10:30')

    userEvent.type(hoursElement, '{arrowdown}{arrowdown}{arrowdown}{arrowdown}')
    expect(inputElement).toHaveValue('09:30')

    userEvent.type(hoursElement, '{arrowup}{arrowup}{arrowup}{arrowup}')
    expect(inputElement).toHaveValue('11:30')
  })

  test('a11y', async () => {
    const { container } = renderWithProviders(<TimeInput label="Time" />)
    await assertNoA11yViolations(container)
  })
})
