import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SliderInput from '..'

const mockedOnChange = jest.fn()

describe('<SliderInput />', () => {
  test('should render correctly', () => {
    render(<SliderInput data-testid="test" min={0} max={100} />)
    expect(screen.getByTestId('test')).toBeInTheDocument()
  })
})
