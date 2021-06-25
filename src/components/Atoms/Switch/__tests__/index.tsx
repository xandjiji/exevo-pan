import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Switch from '..'

const mockedOnClick = jest.fn()

describe('<Switch />', () => {
  test('should trigger onClick', () => {
    render(<Switch onClick={mockedOnClick} />)
    const switchElement = screen.getByRole('switch')

    expect(switchElement).not.toBeChecked()
    userEvent.click(switchElement)
    expect(switchElement).toBeChecked()
    expect(mockedOnClick).toBeCalledTimes(1)
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
