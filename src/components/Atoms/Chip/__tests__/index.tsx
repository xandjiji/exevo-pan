import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Chip from '..'

const mockedOnClick = jest.fn()
const mockedOnClose = jest.fn()

describe('<Chip />', () => {
  beforeEach(() => {
    mockedOnClick.mockReset()
    mockedOnClose.mockReset()
  })

  test('it renders correctly', () => {
    render(<Chip data-testid="testid">test</Chip>)

    expect(screen.getByTestId('testid')).toBeInTheDocument()
    expect(screen.getByText(/test/i)).toBeInTheDocument()
    expect(screen.queryByLabelText(/remove item/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('switch')).not.toBeInTheDocument()
  })

  test('it triggers click handler', () => {
    render(<Chip onClick={mockedOnClick} />)

    const chipElement = screen.getByRole('switch')

    expect(chipElement).not.toBeChecked()
    userEvent.click(chipElement)
    expect(chipElement).toBeChecked()
    expect(mockedOnClick).toBeCalledTimes(1)
  })

  test('it doesnt trigger click handler', () => {
    render(<Chip data-testid="testid" />)

    const chipElement = screen.getByTestId('testid')

    expect(chipElement).not.toBeChecked()
    userEvent.click(chipElement)
    expect(mockedOnClick).toBeCalledTimes(0)
    expect(chipElement).not.toBeChecked()
  })

  test('it triggers close handler', () => {
    render(<Chip onClose={mockedOnClose} />)

    const closeButton = screen.getByLabelText(/remove item/i)
    userEvent.click(closeButton)
    expect(closeButton).toBeInTheDocument()
    expect(mockedOnClose).toBeCalledTimes(1)
  })

  describe('it overrides status correctly', () => {
    test('for true', () => {
      render(<Chip onClick={mockedOnClick} overrideStatus={true} />)

      const chipElement = screen.getByRole('switch')

      expect(chipElement).toBeChecked()
      userEvent.click(chipElement)
      expect(chipElement).toBeChecked()
    })

    test('for false', () => {
      render(<Chip onClick={mockedOnClick} overrideStatus={false} />)

      const chipElement = screen.getByRole('switch')

      expect(chipElement).not.toBeChecked()
      userEvent.click(chipElement)
      expect(chipElement).not.toBeChecked()
    })
  })

  describe('for keypress events', () => {
    test('should trigger on chip keypress', () => {
      render(<Chip onClick={mockedOnClick} />)
      const chipElement = screen.getByRole('switch')

      userEvent.tab()
      expect(chipElement).toHaveFocus()

      userEvent.keyboard('{enter}')
      expect(mockedOnClick).toBeCalledTimes(1)
      expect(chipElement).toBeChecked()

      userEvent.type(chipElement, '{space}')
      expect(mockedOnClick).toBeCalledTimes(2)
      expect(chipElement).not.toBeChecked()
    })

    test('should trigger on close button keypress', () => {
      render(<Chip onClose={mockedOnClose} />)
      const closeButton = screen.getByLabelText(/remove item/i)

      userEvent.tab()
      expect(closeButton).toHaveFocus()

      userEvent.keyboard('{enter}')
      expect(mockedOnClose).toBeCalledTimes(1)

      userEvent.type(closeButton, '{space}')
      expect(mockedOnClose).toBeCalledTimes(3)
    })
  })
})
