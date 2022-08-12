import { useState, memo } from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import TextArea from '..'

const ControlledComponent: typeof TextArea = memo((args) => {
  const [value, setValue] = useState('initial value')

  return (
    <TextArea
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
})

describe('<TextArea />', () => {
  test('should be controlled', () => {
    renderWithProviders(<ControlledComponent label="Name" />)

    const textAreaElement = screen.getByLabelText('Name')

    expect(textAreaElement).toHaveValue('initial value')

    userEvent.clear(textAreaElement)
    expect(textAreaElement).toHaveValue('')

    userEvent.type(textAreaElement, 'new value')
    expect(textAreaElement).toHaveValue('new value')
  })

  test('should control its own value (with `defaultValue`)', () => {
    renderWithProviders(<TextArea label="Name" defaultValue="initial value" />)

    const textAreaElement = screen.getByLabelText('Name')

    expect(textAreaElement).toHaveValue('initial value')

    userEvent.clear(textAreaElement)
    expect(textAreaElement).toHaveValue('')

    userEvent.type(textAreaElement, 'new value')
    expect(textAreaElement).toHaveValue('new value')
  })

  test.todo('should display an error message')

  test.todo('should be disabled')

  test.todo('should be controlled')

  test.todo('A11y')
})
