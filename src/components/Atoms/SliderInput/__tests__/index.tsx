import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import SliderInput from '..'

const mockedOnChange = jest.fn()

describe('<SliderInput />', () => {
  test('should render correctly', () => {
    renderWithProviders(
      <SliderInput
        data-testid="test"
        aria-label="test-aria-label"
        aria-labelledby="test-aria-labelledby"
        min={0}
        max={100}
      />,
    )
    expect(screen.getByTestId('test')).toBeInTheDocument()

    const cursorElement = screen.getByRole('slider')
    expect(cursorElement).toHaveAttribute('aria-valuenow', '0')
    expect(cursorElement).toHaveAttribute('aria-valuemin', '0')
    expect(cursorElement).toHaveAttribute('aria-valuemax', '100')
    expect(cursorElement).toHaveAttribute('aria-label', 'change value')

    const [displayInput] = screen.getAllByLabelText('test-aria-label')
    expect(displayInput).toHaveAttribute(
      'aria-labelledby',
      'test-aria-labelledby',
    )
  })

  test('cursor should be controlled by arrow keys', () => {
    renderWithProviders(
      <SliderInput
        data-testid="test"
        aria-label="choose a skill level"
        min={0}
        max={2000}
        onChange={mockedOnChange}
      />,
    )
    const [displayInput] = screen.getAllByLabelText('choose a skill level')
    const cursorElement = screen.getByLabelText('change value')

    expect(displayInput).toHaveValue('0')
    expect(cursorElement).toHaveAttribute('aria-valuenow', '0')

    userEvent.tab()
    userEvent.keyboard('{arrowup}')
    expect(displayInput).toHaveValue('1')
    expect(cursorElement).toHaveAttribute('aria-valuenow', '1')

    userEvent.keyboard('{ctrl}{arrowup}')
    expect(displayInput).toHaveValue('11')
    expect(cursorElement).toHaveAttribute('aria-valuenow', '11')

    userEvent.keyboard('{shift}{arrowup}')
    expect(displayInput).toHaveValue('111')
    expect(cursorElement).toHaveAttribute('aria-valuenow', '111')

    userEvent.keyboard('{ctrl}{shift}{arrowup}')
    expect(displayInput).toHaveValue('1111')
    expect(cursorElement).toHaveAttribute('aria-valuenow', '1111')

    userEvent.keyboard('{arrowdown}')
    expect(displayInput).toHaveValue('1110')
    expect(cursorElement).toHaveAttribute('aria-valuenow', '1110')

    userEvent.keyboard('{ctrl}{arrowdown}')
    expect(displayInput).toHaveValue('1100')
    expect(cursorElement).toHaveAttribute('aria-valuenow', '1100')

    userEvent.keyboard('{shift}{arrowdown}')
    expect(displayInput).toHaveValue('1000')
    expect(cursorElement).toHaveAttribute('aria-valuenow', '1000')

    userEvent.keyboard('{ctrl}{shift}{arrowdown}')
    expect(displayInput).toHaveValue('0')
    expect(cursorElement).toHaveAttribute('aria-valuenow', '0')

    userEvent.keyboard('{arrowright}')
    expect(displayInput).toHaveValue('1')
    expect(cursorElement).toHaveAttribute('aria-valuenow', '1')

    userEvent.keyboard('{ctrl}{arrowright}')
    expect(displayInput).toHaveValue('11')
    expect(cursorElement).toHaveAttribute('aria-valuenow', '11')

    userEvent.keyboard('{shift}{arrowright}')
    expect(displayInput).toHaveValue('111')
    expect(cursorElement).toHaveAttribute('aria-valuenow', '111')

    userEvent.keyboard('{ctrl}{shift}{arrowright}')
    expect(displayInput).toHaveValue('1111')
    expect(cursorElement).toHaveAttribute('aria-valuenow', '1111')

    userEvent.keyboard('{arrowleft}')
    expect(displayInput).toHaveValue('1110')
    expect(cursorElement).toHaveAttribute('aria-valuenow', '1110')

    userEvent.keyboard('{ctrl}{arrowleft}')
    expect(displayInput).toHaveValue('1100')
    expect(cursorElement).toHaveAttribute('aria-valuenow', '1100')

    userEvent.keyboard('{shift}{arrowleft}')
    expect(displayInput).toHaveValue('1000')
    expect(cursorElement).toHaveAttribute('aria-valuenow', '1000')

    userEvent.keyboard('{ctrl}{shift}{arrowleft}')
    expect(displayInput).toHaveValue('0')
    expect(cursorElement).toHaveAttribute('aria-valuenow', '0')
  })

  test('display input should be controlled by arrow keys', () => {
    renderWithProviders(
      <SliderInput
        data-testid="test"
        aria-label="choose a skill level"
        min={0}
        max={2000}
        onChange={mockedOnChange}
      />,
    )
    const [displayInput] = screen.getAllByLabelText('choose a skill level')
    const cursorElement = screen.getByLabelText('change value')

    expect(displayInput).toHaveValue('0')
    expect(cursorElement).toHaveAttribute('aria-valuenow', '0')

    userEvent.type(displayInput, '{arrowup}')
    expect(displayInput).toHaveValue('1')
    expect(cursorElement).toHaveAttribute('aria-valuenow', '1')

    userEvent.type(displayInput, '{ctrl}{arrowup}')
    expect(displayInput).toHaveValue('11')
    expect(cursorElement).toHaveAttribute('aria-valuenow', '11')

    userEvent.type(displayInput, '{shift}{arrowup}')
    expect(displayInput).toHaveValue('111')
    expect(cursorElement).toHaveAttribute('aria-valuenow', '111')

    userEvent.type(displayInput, '{ctrl}{shift}{arrowup}')
    expect(displayInput).toHaveValue('1111')
    expect(cursorElement).toHaveAttribute('aria-valuenow', '1111')

    userEvent.type(displayInput, '{arrowdown}')
    expect(displayInput).toHaveValue('1110')
    expect(cursorElement).toHaveAttribute('aria-valuenow', '1110')

    userEvent.type(displayInput, '{ctrl}{arrowdown}')
    expect(displayInput).toHaveValue('1100')
    expect(cursorElement).toHaveAttribute('aria-valuenow', '1100')

    userEvent.type(displayInput, '{shift}{arrowdown}')
    expect(displayInput).toHaveValue('1000')
    expect(cursorElement).toHaveAttribute('aria-valuenow', '1000')

    userEvent.type(displayInput, '{ctrl}{shift}{arrowdown}')
    expect(displayInput).toHaveValue('0')
    expect(cursorElement).toHaveAttribute('aria-valuenow', '0')
  })

  test('onChange should be called', () => {
    renderWithProviders(
      <SliderInput
        data-testid="test"
        aria-label="choose a skill level"
        min={0}
        max={2000}
        onChange={mockedOnChange}
      />,
    )

    mockedOnChange.mockClear()

    userEvent.tab()
    userEvent.keyboard('{arrowup}')
    expect(mockedOnChange).toBeCalledTimes(1)

    const [displayInput] = screen.getAllByLabelText('choose a skill level')
    userEvent.type(displayInput, '101')
    expect(mockedOnChange).toBeCalledTimes(4)

    userEvent.keyboard('{arrowup}')
    expect(mockedOnChange).toBeCalledTimes(5)
    userEvent.type(displayInput, '102')
  })

  test('should be invalid', () => {
    renderWithProviders(<SliderInput data-testid="test" min={0} max={100} />)

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
    renderWithProviders(
      <SliderInput
        data-testid="test"
        aria-label="choose a skill level"
        min={0}
        max={100}
      />,
    )

    const [displayInput] = screen.getAllByLabelText('choose a skill level')
    const hiddenInput = screen.getByTestId('test')
    const cursor = screen.getByRole('slider')

    userEvent.tab()
    userEvent.keyboard('{shift}{arrowup}{arrowup}')
    expect(displayInput).toHaveValue('100')
    expect(displayInput).toBeValid()
    expect(hiddenInput).toBeValid()
    expect(cursor).toHaveStyle('left: 100%')

    userEvent.keyboard('{shift}{arrowdown}{arrowdown}')
    expect(displayInput).toHaveValue('0')
    expect(displayInput).toBeValid()
    expect(hiddenInput).toBeValid()
    expect(hiddenInput).toHaveValue('0')
    expect(cursor).toHaveStyle('left: 0%')

    userEvent.clear(displayInput)
    userEvent.type(displayInput, '5')
    expect(displayInput).toHaveValue('5')
    expect(hiddenInput).toHaveValue('5')
    expect(displayInput).toBeValid()
    expect(hiddenInput).toBeValid()
    expect(cursor).toHaveStyle('left: 5%')

    userEvent.type(displayInput, '0')
    expect(displayInput).toHaveValue('50')
    expect(hiddenInput).toHaveValue('50')
    expect(displayInput).toBeValid()
    expect(hiddenInput).toBeValid()
    expect(cursor).toHaveStyle('left: 50%')

    userEvent.type(displayInput, '0')
    expect(displayInput).toHaveValue('100')
    expect(hiddenInput).toHaveValue('100')
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

    userEvent.type(displayInput, '{shift}{arrowup}{arrowup}')
    expect(displayInput).toHaveValue('100')
    expect(displayInput).toBeValid()
    expect(hiddenInput).toBeValid()
    expect(cursor).toHaveStyle('left: 100%')

    userEvent.type(displayInput, '{shift}{arrowdown}{arrowdown}')
    expect(displayInput).toHaveValue('0')
    expect(displayInput).toBeValid()
    expect(hiddenInput).toBeValid()
    expect(hiddenInput).toHaveValue('0')
    expect(cursor).toHaveStyle('left: 0%')
  })

  test('should work well with negative values', () => {
    renderWithProviders(<SliderInput min={-200} max={200} />)

    const displayInput = screen.getAllByDisplayValue(-200)[0]
    userEvent.clear(displayInput)
    userEvent.type(displayInput, '0')

    expect(screen.getByRole('slider')).toHaveStyle('left: 50%')
  })

  test('should be controlled', () => {
    const { rerender } = renderWithProviders(
      <SliderInput data-testid="test" min={0} max={100} />,
    )

    const displayInput = screen.getAllByDisplayValue(0)[0]
    const hiddenInput = screen.getByTestId('test')
    const cursor = screen.getByRole('slider')

    expect(displayInput).toHaveValue('0')
    expect(hiddenInput).toHaveValue('0')
    expect(cursor).toHaveStyle('left: 0%')

    rerender(<SliderInput data-testid="test" min={0} max={100} value={50} />)

    expect(displayInput).toHaveValue('50')
    expect(hiddenInput).toHaveValue('50')
    expect(cursor).toHaveStyle('left: 50%')
  })
})
