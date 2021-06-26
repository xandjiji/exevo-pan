import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Switch from '..'

const mockedOnClick = jest.fn()

describe('<Switch />', () => {
  beforeEach(() => {
    mockedOnClick.mockReset()
  })

  test('should trigger onClick', () => {
    render(<Switch onClick={mockedOnClick} />)
    const switchElement = screen.getByRole('switch')

    expect(switchElement).not.toBeChecked()
    userEvent.click(switchElement)
    expect(switchElement).toBeChecked()
    expect(mockedOnClick).toBeCalledTimes(1)
  })

  test('should trigger on keypress', () => {
    render(<Switch onClick={mockedOnClick} />)
    const switchElement = screen.getByRole('switch')

    userEvent.tab()
    expect(switchElement).toHaveFocus()

    userEvent.keyboard('{enter}')
    expect(mockedOnClick).toBeCalledTimes(1)
    expect(switchElement).toBeChecked()

    userEvent.type(switchElement, '{space}')
    expect(mockedOnClick).toBeCalledTimes(2)
    expect(switchElement).not.toBeChecked()
  })

  test('should have icon element', () => {
    render(<Switch icon={<div role="none" />} />)
    expect(screen.getByRole('none')).toBeInTheDocument()
  })

  test('should have children', () => {
    render(<Switch>children</Switch>)
    expect(screen.getByText('children')).toBeInTheDocument()
  })

  test('should be forced to be active', () => {
    render(<Switch active />)
    const switchElement = screen.getByRole('switch')

    expect(switchElement).toBeChecked()
    userEvent.click(switchElement)
    expect(switchElement).toBeChecked()
  })
})
