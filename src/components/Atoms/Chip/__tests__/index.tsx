import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Chip from '..'
import { backgroundStyle, colorStyle } from '../styles'
import { styleObject } from '../types'

const mockedOnClick = jest.fn()
const mockedOnClose = jest.fn()

const checkElementStyle = (element: HTMLElement, status: string) => {
  expect(element).toHaveStyle(backgroundStyle[status] as styleObject)
  expect(element).toHaveStyle(colorStyle[status] as styleObject)
}

describe('<Chip />', () => {
  test('it renders correctly', () => {
    render(<Chip data-testid="testid">test</Chip>)

    expect(screen.getByTestId('testid')).toBeInTheDocument()
    expect(screen.getByText(/test/i)).toBeInTheDocument()
    expect(screen.queryByLabelText(/remove item/i)).not.toBeInTheDocument()
  })

  test('it triggers click handler', () => {
    render(<Chip data-testid="testid" onClick={mockedOnClick} />)

    const chipElement = screen.getByTestId('testid')

    checkElementStyle(chipElement, 'inactive')

    userEvent.click(chipElement)
    expect(mockedOnClick).toBeCalledTimes(1)
    checkElementStyle(chipElement, 'active')
  })

  test('it doesnt trigger click handler', () => {
    render(<Chip data-testid="testid" />)

    userEvent.click(screen.getByTestId('testid'))
    expect(mockedOnClick).toBeCalledTimes(0)
  })

  test('it triggers close handler', () => {
    render(<Chip onClose={mockedOnClose} />)

    const closeButton = screen.getByLabelText(/remove item/i)
    userEvent.click(closeButton)
    expect(closeButton).toBeInTheDocument()
    expect(mockedOnClose).toBeCalledTimes(1)
  })

  describe('it overrides status correctly', () => {
    test('without onClick', () => {
      render(<Chip data-testid="testid" overrideStatus={true} />)

      const chipElement = screen.getByTestId('testid')
      checkElementStyle(chipElement, 'active')
    })

    test('False with onClick', () => {
      render(
        <Chip
          data-testid="testid"
          overrideStatus={false}
          onClick={jest.fn()}
        />,
      )

      const chipElement = screen.getByTestId('testid')

      checkElementStyle(chipElement, 'inactive')

      userEvent.click(chipElement)
      checkElementStyle(chipElement, 'inactive')
    })

    test('True with onClick', () => {
      render(
        <Chip data-testid="testid" overrideStatus={true} onClick={jest.fn()} />,
      )

      const chipElement = screen.getByTestId('testid')

      checkElementStyle(chipElement, 'inactive')

      userEvent.click(chipElement)
      checkElementStyle(chipElement, 'inactive')
    })
  })
})
