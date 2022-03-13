import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import Checkbox from '..'

const mockedOnChange = jest.fn()

describe('<Checkbox />', () => {
  beforeEach(() => {
    mockedOnChange.mockClear()
  })

  test('should render label correctly', () => {
    const { rerender } = renderWithProviders(<Checkbox label="string label" />)

    expect(screen.getByText('string label')).toBeInTheDocument()

    rerender(<Checkbox label={<div role="none">node label</div>} />)

    expect(screen.getByRole('none')).toHaveTextContent('node label')
  })

  test('should control its own state', () => {
    renderWithProviders(<Checkbox onChange={mockedOnChange} />)

    const checkboxElement = screen.getByRole('checkbox')
    expect(checkboxElement).not.toBeChecked()
    expect(mockedOnChange).toHaveBeenCalledTimes(0)

    userEvent.click(checkboxElement)
    expect(checkboxElement).toBeChecked()
    expect(mockedOnChange).toHaveBeenCalledTimes(1)

    userEvent.click(checkboxElement)
    expect(checkboxElement).not.toBeChecked()
    expect(mockedOnChange).toHaveBeenCalledTimes(2)
  })

  test('should be controlled', () => {
    const { rerender } = renderWithProviders(
      <Checkbox checked={false} onChange={mockedOnChange} />,
    )

    const checkboxElement = screen.getByRole('checkbox')
    expect(checkboxElement).not.toBeChecked()
    expect(mockedOnChange).toHaveBeenCalledTimes(0)

    userEvent.click(checkboxElement)
    expect(checkboxElement).not.toBeChecked()
    expect(mockedOnChange).toHaveBeenCalledTimes(1)

    rerender(<Checkbox checked onChange={mockedOnChange} />)

    expect(checkboxElement).toBeChecked()
    expect(mockedOnChange).toHaveBeenCalledTimes(1)

    userEvent.click(checkboxElement)
    expect(checkboxElement).toBeChecked()
    expect(mockedOnChange).toHaveBeenCalledTimes(2)
  })

  test('should be disabled', () => {
    const { rerender } = renderWithProviders(
      <div role="none">
        <Checkbox disabled onChange={mockedOnChange} />
      </div>,
    )
    const wrapperElement = screen.getByRole('none')

    const checkboxElement = screen.getByRole('checkbox')
    expect(checkboxElement).toBeDisabled()
    expect(checkboxElement).not.toBeChecked()
    expect(mockedOnChange).toHaveBeenCalledTimes(0)

    userEvent.click(wrapperElement)
    expect(checkboxElement).not.toBeChecked()
    expect(mockedOnChange).toHaveBeenCalledTimes(0)

    rerender(
      <div role="none">
        <Checkbox onChange={mockedOnChange} />
      </div>,
    )

    expect(checkboxElement).toBeEnabled()
    expect(checkboxElement).not.toBeChecked()
    expect(mockedOnChange).toHaveBeenCalledTimes(0)

    userEvent.click(checkboxElement)
    expect(checkboxElement).toBeChecked()
    expect(mockedOnChange).toHaveBeenCalledTimes(1)
  })
})
