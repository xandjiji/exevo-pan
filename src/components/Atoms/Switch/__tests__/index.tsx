import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Switch from '..'

const mockedOnClick = jest.fn()

describe('<Switch />', () => {
  test('should trigger onClick', () => {
    render(<Switch onClick={mockedOnClick} />)
    const switchElement = screen.getByRole('button')
    expect(switchElement).toHaveAttribute('aria-selected', 'false')
    userEvent.click(switchElement)
    expect(switchElement).toHaveAttribute('aria-selected', 'true')
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
})
