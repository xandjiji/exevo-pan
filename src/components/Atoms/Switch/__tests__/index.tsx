import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Switch from '..'

const mockedOnClick = jest.fn()

describe('<Switch />', () => {
  test('should render correctly', () => {
    render(<Switch data-testid="test" />)
    expect(screen.getByTestId('test')).toBeInTheDocument()
  })

  test('should trigger onClick', () => {
    render(<Switch onClick={mockedOnClick} />)
    userEvent.click(screen.getByRole('button'))
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
