import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SliderInput from '..'

const mockedOnChange = jest.fn()

describe('<SliderInput />', () => {
  test('should render correctly', () => {
    render(<SliderInput data-testid="test" min={0} max={100} />)
    expect(screen.getByTestId('test')).toBeInTheDocument()
  })

  test('onChange should be called', async () => {
    render(
      <SliderInput
        data-testid="test"
        min={0}
        max={100}
        onChange={mockedOnChange}
      />,
    )

    const hiddenInput = screen.getByTestId('test')
    userEvent.type(hiddenInput, '-50')
    expect(mockedOnChange).toBeCalledTimes(3)
  })

  test('should be invalid', async () => {
    render(<SliderInput data-testid="test" min={0} max={100} />)

    const displayInput = screen.getAllByDisplayValue(0)[0]
    const hiddenInput = screen.getByTestId('test')

    userEvent.clear(displayInput)
    userEvent.type(displayInput, '-50')
    expect(displayInput).toHaveValue('-50')
    expect(displayInput).toBeInvalid()

    expect(hiddenInput).not.toHaveValue('-50')
    expect(hiddenInput).toBeInvalid()
  })

  test('should clamp values between 0 and 100', () => {
    render(<SliderInput data-testid="test" min={0} max={100} />)

    const displayInput = screen.getAllByDisplayValue(0)[0]
    const hiddenInput = screen.getByTestId('test')
    const cursor = screen.getByRole('slider')

    userEvent.clear(displayInput)
    userEvent.type(displayInput, '999')
    expect(displayInput).toHaveValue('100')
    expect(displayInput).toBeValid()
    expect(hiddenInput).toBeValid()
    expect(cursor).toHaveStyle('left: 100%')

    userEvent.clear(displayInput)
    userEvent.type(displayInput, '-999')
    userEvent.tab()
    expect(displayInput).toHaveValue('0')
    expect(displayInput).toBeValid()
    expect(hiddenInput).toBeValid()
    expect(hiddenInput).toHaveValue('0')
    expect(cursor).toHaveStyle('left: 0%')
  })

  test('should work well with negative values', () => {
    render(<SliderInput min={-200} max={200} />)

    const displayInput = screen.getAllByDisplayValue(-200)[0]
    userEvent.clear(displayInput)
    userEvent.type(displayInput, '0')

    expect(screen.getByRole('slider')).toHaveStyle('left: 50%')
  })
})
