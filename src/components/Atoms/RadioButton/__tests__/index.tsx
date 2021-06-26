import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RadioButton from '..'

const mockedOnClick = jest.fn()

describe('<RadioButton />', () => {
  beforeEach(() => {
    mockedOnClick.mockReset()
  })

  test('renders children', () => {
    render(
      <RadioButton>
        <div role="none" />
      </RadioButton>,
    )

    expect(screen.getByRole('none')).toBeInTheDocument()
  })

  test('controls inner state correctly', () => {
    render(<RadioButton />)
    const radioElement = screen.getByRole('radio')

    expect(radioElement).not.toBeChecked()
    userEvent.click(radioElement)
    expect(radioElement).toBeChecked()
    userEvent.click(radioElement)
    expect(radioElement).toBeChecked()
  })

  describe('is controlled correctly', () => {
    test('for True', () => {
      render(<RadioButton active />)
      const radioElement = screen.getByRole('radio')

      expect(radioElement).toBeChecked()
      userEvent.click(radioElement)
      expect(radioElement).toBeChecked()
    })

    test('for False', () => {
      render(<RadioButton active={false} />)
      const radioElement = screen.getByRole('radio')

      expect(radioElement).not.toBeChecked()
      userEvent.click(radioElement)
      expect(radioElement).not.toBeChecked()
    })
  })

  test('calls onClick function', () => {
    render(<RadioButton onClick={mockedOnClick} />)
    const radioElement = screen.getByRole('radio')

    userEvent.click(radioElement)
    expect(mockedOnClick).toBeCalledTimes(1)
    userEvent.click(radioElement)
    expect(mockedOnClick).toBeCalledTimes(2)
  })

  test('calls onClick function on keyboard events', () => {
    render(<RadioButton onClick={mockedOnClick} />)

    userEvent.tab()
    userEvent.keyboard('{enter}')
    expect(mockedOnClick).toBeCalledTimes(1)

    userEvent.type(screen.getByRole('radio'), '{space}')
    expect(mockedOnClick).toBeCalledTimes(2)
  })

  test('keyboard events check radio button correctyle', () => {
    render(<RadioButton />)
    const radioElement = screen.getByRole('radio')

    userEvent.tab()
    userEvent.keyboard('{enter}')
    expect(radioElement).toBeChecked()

    userEvent.type(radioElement, '{space}')
    expect(radioElement).toBeChecked()
  })
})
