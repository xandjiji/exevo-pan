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
})
