import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import RadioButton from '..'

const mockedOnClick = jest.fn()

describe('<RadioButton />', () => {
  beforeEach(() => {
    mockedOnClick.mockReset()
  })

  test('renders children', () => {
    renderWithProviders(
      <RadioButton>
        <div role="none" />
      </RadioButton>,
    )

    expect(screen.getByRole('none')).toBeInTheDocument()
  })

  test('controls inner state correctly', () => {
    renderWithProviders(<RadioButton />)
    const radioElement = screen.getByRole('radio')

    expect(radioElement).not.toBeChecked()
    userEvent.click(radioElement)
    expect(radioElement).toBeChecked()
    userEvent.click(radioElement)
    expect(radioElement).toBeChecked()
  })

  test('is controlled correctly', () => {
    const { rerender } = renderWithProviders(<RadioButton active />)
    const radioElement = screen.getByRole('radio')

    expect(radioElement).toBeChecked()
    userEvent.click(radioElement)
    expect(radioElement).toBeChecked()

    rerender(<RadioButton active={false} />)

    expect(radioElement).not.toBeChecked()
    userEvent.click(radioElement)
    expect(radioElement).not.toBeChecked()
  })

  test('calls onClick function', () => {
    renderWithProviders(<RadioButton onClick={mockedOnClick} />)
    const radioElement = screen.getByRole('radio')

    userEvent.click(radioElement)
    expect(mockedOnClick).toBeCalledTimes(1)
    userEvent.click(radioElement)
    expect(mockedOnClick).toBeCalledTimes(2)
  })

  test('calls onClick function on keyboard events', () => {
    renderWithProviders(<RadioButton onClick={mockedOnClick} />)

    userEvent.tab()
    userEvent.keyboard('{enter}')
    expect(mockedOnClick).toBeCalledTimes(1)

    userEvent.type(screen.getByRole('radio'), '{space}')
    expect(mockedOnClick).toBeCalledTimes(2)
  })

  test('keyboard events check radio button correctyle', () => {
    renderWithProviders(<RadioButton />)
    const radioElement = screen.getByRole('radio')

    userEvent.tab()
    userEvent.keyboard('{enter}')
    expect(radioElement).toBeChecked()

    userEvent.type(radioElement, '{space}')
    expect(radioElement).toBeChecked()
  })
})
