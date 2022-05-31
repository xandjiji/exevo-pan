import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, assertNoA11yViolations } from 'utils/test'
import Input from '..'

const mockedOnChange = jest.fn()

describe('<Input />', () => {
  test('allowClear = TRUE should ENABLE ClearButton and its functionalities', () => {
    renderWithProviders(<Input allowClear label="input" />)

    const inputElement = screen.getByLabelText('input')
    const clearButton = screen.getByLabelText('Clear input')

    expect(clearButton).toBeDisabled()
    expect(clearButton).toHaveClass('opacity-0')

    userEvent.type(inputElement, 'text')
    expect(clearButton).toBeEnabled()
    expect(clearButton).not.toHaveClass('opacity-0')
    expect(inputElement).toHaveValue('text')

    userEvent.click(clearButton)
    expect(inputElement).toHaveValue('')
    expect(clearButton).toBeDisabled()
    expect(clearButton).toHaveClass('opacity-0')
    expect(inputElement).toHaveFocus()

    userEvent.keyboard('another text')
    expect(clearButton).toBeEnabled()
    expect(clearButton).not.toHaveClass('opacity-0')
    expect(inputElement).toHaveValue('another text')

    userEvent.tab()
    expect(clearButton).toHaveFocus()
    userEvent.keyboard('{enter}')
    expect(inputElement).toHaveValue('')
    expect(clearButton).toBeDisabled()
    expect(clearButton).toHaveClass('opacity-0')
    expect(inputElement).toHaveFocus()
  })

  test('allowClear = FALSE should DISABLE ClearButton and its functionalities', () => {
    renderWithProviders(<Input label="input" />)

    const inputElement = screen.getByLabelText('input')

    expect(screen.queryByLabelText('Clear input')).not.toBeInTheDocument()

    userEvent.type(inputElement, 'text')
    expect(inputElement).toHaveValue('text')
  })

  test('errorMessage should be visible', () => {
    renderWithProviders(<Input label="Server" errorMessage="invalid field" />)

    const inputElement = screen.getByLabelText('Server')
    const errorElement = screen.getByRole('alert')

    expect(inputElement).toBeInvalid()
    expect(errorElement).not.toHaveClass('opacity-0')
    expect(errorElement).toHaveTextContent('invalid field')

    expect(inputElement).toHaveAttribute(
      'aria-errormessage',
      errorElement.getAttribute('id'),
    )
  })

  test('errorMessage should NOT visible', () => {
    const { rerender } = renderWithProviders(
      <Input label="input" errorMessage="field is invalid" />,
    )

    const inputElement = screen.getByLabelText('input')
    const errorElement = screen.getByRole('alert')

    expect(inputElement).toBeInvalid()
    expect(errorElement).not.toHaveClass('opacity-0')
    expect(errorElement).toHaveTextContent('field is invalid')

    expect(inputElement).toHaveAttribute(
      'aria-errormessage',
      errorElement.getAttribute('id'),
    )

    rerender(<Input label="input" />)

    expect(inputElement).not.toBeInvalid()
    expect(errorElement).toHaveClass('opacity-0')
    expect(errorElement).toHaveTextContent('')

    expect(inputElement).not.toHaveAttribute(
      'aria-errormessage',
      errorElement.getAttribute('id'),
    )
  })

  test('className and Style should be attributed to wrapper and not to input', () => {
    const { container } = renderWithProviders(
      <Input className="class" style={{ width: 1000 }} label="input" />,
    )

    const inputElement = screen.getByLabelText('input')
    expect(inputElement).not.toHaveClass('class')
    expect(inputElement).not.toHaveStyle('width: 1000px')

    const [wrapperElement] = container.getElementsByClassName('class')
    expect(wrapperElement).toHaveStyle('width: 1000px')
  })

  test('should be controllable', () => {
    const { rerender } = renderWithProviders(
      <Input
        allowClear
        label="Nickname"
        value="Eternal Oblivion"
        onChange={mockedOnChange}
      />,
    )

    const inputElement = screen.getByLabelText('Nickname')
    const clearButton = screen.getByLabelText('Clear input')

    expect(inputElement).toHaveValue('Eternal Oblivion')
    expect(clearButton).toBeEnabled()
    expect(clearButton).not.toHaveClass('opacity-0')

    userEvent.tab()
    userEvent.keyboard('BUBBLE')
    expect(inputElement).toHaveValue('Eternal Oblivion')
    expect(mockedOnChange).toHaveBeenCalledTimes(6)

    userEvent.click(clearButton)
    expect(inputElement).toHaveValue('Eternal Oblivion')
    expect(mockedOnChange).toHaveBeenCalledTimes(7)

    rerender(
      <Input
        allowClear
        label="Nickname"
        value="Cachero"
        onChange={mockedOnChange}
      />,
    )

    expect(inputElement).toHaveValue('Cachero')
  })

  test('should be disabled', () => {
    renderWithProviders(
      <Input label="input" disabled allowClear defaultValue="initial value" />,
    )

    const inputElement = screen.getByLabelText('input')

    userEvent.type(inputElement, 'my value')
    expect(inputElement).toHaveValue('initial value')

    expect(screen.queryByLabelText('Clear input')).not.toBeInTheDocument()
  })

  test('should display state icons', () => {
    const { rerender } = renderWithProviders(
      <Input label="input" stateIcon="loading" />,
    )

    expect(screen.getByLabelText('Validating...')).toBeInTheDocument()

    rerender(<Input label="input" stateIcon="invalid" />)
    expect(screen.getByLabelText('Field is invalid')).toBeInTheDocument()

    rerender(<Input label="input" stateIcon="valid" />)
    expect(screen.getByLabelText('Field is valid')).toBeInTheDocument()
  })

  test('should still be acessible with element label', () => {
    renderWithProviders(
      <Input
        allowClear
        label={<p>element label</p>}
        aria-label="input label"
        value="10"
      />,
    )

    expect(screen.getByLabelText('input label')).toHaveValue('10')
  })

  test('a11y', async () => {
    const { container } = renderWithProviders(
      <Input allowClear label="input label" />,
    )
    await assertNoA11yViolations(container)
  })
})
