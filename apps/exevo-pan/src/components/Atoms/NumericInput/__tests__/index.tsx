import { useState } from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import NumericInput from '..'

const ControlledNumericInput: typeof NumericInput = (args) => {
  const [value, setValue] = useState<number | undefined>()
  return <NumericInput value={value} onChange={setValue} {...args} />
}

describe('<NumericInput />', () => {
  test('should format numbers correctly', () => {
    renderWithProviders(<ControlledNumericInput label="Amount" />)
    const inputElement = screen.getByLabelText('Amount')

    expect(inputElement).toHaveValue('')

    userEvent.type(inputElement, '100')
    expect(inputElement).toHaveValue('100')

    userEvent.clear(inputElement)
    userEvent.type(inputElement, '1000')
    expect(inputElement).toHaveValue('1,000')

    userEvent.clear(inputElement)
    userEvent.type(inputElement, '123a4b5c6d7')
    expect(inputElement).toHaveValue('1,234,567')
  })

  test('should increment/decrement numbers with arrow keys', () => {
    const { rerender } = renderWithProviders(
      <ControlledNumericInput label="Amount" />,
    )
    const inputElement = screen.getByLabelText('Amount')

    userEvent.type(inputElement, '500')
    expect(inputElement).toHaveValue('500')

    userEvent.keyboard('{arrowup}')
    expect(inputElement).toHaveValue('600')

    userEvent.keyboard('{arrowup}{arrowup}{arrowup}{arrowup}')
    expect(inputElement).toHaveValue('1,000')

    userEvent.keyboard('{arrowdown}')
    expect(inputElement).toHaveValue('900')

    rerender(<ControlledNumericInput label="Amount" step={1000} />)
    userEvent.keyboard('{arrowup}')
    expect(inputElement).toHaveValue('1,900')

    userEvent.keyboard('{arrowdown}')
    expect(inputElement).toHaveValue('900')

    userEvent.keyboard('{arrowdown}')
    expect(inputElement).toHaveValue('')
  })

  test('should be invalid', () => {
    renderWithProviders(<ControlledNumericInput label="Amount" />)
    const inputElement = screen.getByLabelText('Amount')

    expect(inputElement).toBeValid()
    userEvent.type(inputElement, '100')
    expect(inputElement).toBeValid()
    userEvent.clear(inputElement)
    expect(inputElement).toBeInvalid()
  })

  test.todo('test `alwaysValid` prop')
})
