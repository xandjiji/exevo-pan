import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import Input from '..'

const mockedOnChange = jest.fn()

describe('<Input />', () => {
  test('allowClear = TRUE should ENABLE ClearButton and its functionalities', () => {
    renderWithProviders(<Input allowClear aria-label="input" />)

    const inputElement = screen.getByLabelText('input')
    const clearButton = screen.getByLabelText('Clear input')

    expect(clearButton).toBeDisabled()
    expect(clearButton).not.toBeVisible()

    userEvent.type(inputElement, 'text')
    expect(clearButton).toBeEnabled()
    expect(clearButton).toBeVisible()
    expect(inputElement).toHaveValue('text')

    userEvent.click(clearButton)
    expect(inputElement).toHaveValue('')
    expect(clearButton).toBeDisabled()
    expect(clearButton).not.toBeVisible()
    expect(inputElement).toHaveFocus()

    userEvent.keyboard('another text')
    expect(clearButton).toBeEnabled()
    expect(clearButton).toBeVisible()
    expect(inputElement).toHaveValue('another text')

    userEvent.tab()
    expect(clearButton).toHaveFocus()
    userEvent.keyboard('{enter}')
    expect(inputElement).toHaveValue('')
    expect(clearButton).toBeDisabled()
    expect(clearButton).not.toBeVisible()
    expect(inputElement).toHaveFocus()
  })

  test('allowClear = FALSE should DISABLE ClearButton and its functionalities', () => {
    renderWithProviders(<Input aria-label="input" />)

    const inputElement = screen.getByLabelText('input')

    expect(screen.queryByLabelText('Clear input')).not.toBeInTheDocument()

    userEvent.type(inputElement, 'text')
    expect(inputElement).toHaveValue('text')
  })

  test('errorMessage should be visible', () => {
    renderWithProviders(
      <Input placeholder="Choose a server" errorMessage="invalid field" />,
    )

    const inputElement = screen.getByPlaceholderText('Choose a server')
    const errorElement = screen.getByRole('alert')

    expect(inputElement).toBeInvalid()
    expect(errorElement).toBeVisible()
    expect(errorElement).toHaveTextContent('invalid field')

    expect(inputElement).toHaveAttribute(
      'aria-errormessage',
      errorElement.getAttribute('id'),
    )
  })

  test('errorMessage should NOT visible', () => {
    const { rerender } = renderWithProviders(
      <Input aria-label="input" errorMessage="field is invalid" />,
    )

    const inputElement = screen.getByLabelText('input')
    const errorElement = screen.getByRole('alert')

    expect(inputElement).toBeInvalid()
    expect(errorElement).toBeVisible()
    expect(errorElement).toHaveTextContent('field is invalid')

    expect(inputElement).toHaveAttribute(
      'aria-errormessage',
      errorElement.getAttribute('id'),
    )

    rerender(<Input aria-label="input" />)

    expect(inputElement).not.toBeInvalid()
    expect(errorElement).not.toBeVisible()
    expect(errorElement).toHaveTextContent('')

    expect(inputElement).not.toHaveAttribute(
      'aria-errormessage',
      errorElement.getAttribute('id'),
    )
  })

  test('className and Style should be attributed to wrapper and not to input', () => {
    const { container } = renderWithProviders(
      <Input className="class" style={{ width: 1000 }} aria-label="input" />,
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
        placeholder="Search a nickname"
        value="Eternal Oblivion"
        onChange={mockedOnChange}
      />,
    )

    const inputElement = screen.getByPlaceholderText('Search a nickname')
    const clearButton = screen.getByLabelText('Clear input')

    expect(inputElement).toHaveValue('Eternal Oblivion')
    expect(clearButton).toBeEnabled()
    expect(clearButton).toBeVisible()

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
        placeholder="Search a nickname"
        value="Cachero"
        onChange={mockedOnChange}
      />,
    )

    expect(inputElement).toHaveValue('Cachero')
  })
})
