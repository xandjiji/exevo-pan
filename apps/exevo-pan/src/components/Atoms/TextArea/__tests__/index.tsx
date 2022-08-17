import { useState, memo } from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, assertNoA11yViolations } from 'utils/test'
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

  test('should display an error message', () => {
    renderWithProviders(<TextArea label="Name" error="Invalid name" />)

    expect(screen.getByRole('alert')).toHaveTextContent('Invalid name')
  })

  test('should be disabled', () => {
    renderWithProviders(
      <TextArea label="Name" defaultValue="initial value" disabled />,
    )

    const textAreaElement = screen.getByLabelText('Name')

    expect(textAreaElement).toBeDisabled()

    userEvent.type(textAreaElement, 'dasd')
    expect(textAreaElement).toHaveValue('initial value')
  })

  test('a11y', async () => {
    const { container } = renderWithProviders(<TextArea label="Name" />)
    await assertNoA11yViolations(container)
  })
})
