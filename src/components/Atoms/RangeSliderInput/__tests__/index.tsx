import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import RangeSliderInput from '..'

const mockedOnChange = jest.fn()

describe('<RangeSliderInput />', () => {
  test('should render correctly', () => {
    renderWithProviders(
      <RangeSliderInput data-testid="test" min={0} max={100} />,
    )
    expect(screen.getByTestId('test')).toBeInTheDocument()

    const [cursorA, cursorB] = screen.getAllByRole('slider')
    expect(cursorA).toHaveAttribute('aria-label', 'change value')
    expect(cursorA).toHaveAttribute('aria-valuenow', '0')
    expect(cursorA).toHaveAttribute('aria-valuemax', '100')
    expect(cursorA).toHaveAttribute('aria-valuemin', '0')

    expect(cursorB).toHaveAttribute('aria-label', 'change value')
    expect(cursorB).toHaveAttribute('aria-valuenow', '100')
    expect(cursorB).toHaveAttribute('aria-valuemax', '100')
    expect(cursorB).toHaveAttribute('aria-valuemin', '0')
  })

  test('should initially render cursors correctly', () => {
    renderWithProviders(<RangeSliderInput min={0} max={100} value={[10, 90]} />)

    const [cursorA, cursorB] = screen.getAllByRole('slider')

    expect(cursorA).toHaveStyle('left: 10%')
    expect(cursorB).toHaveStyle('left: 90%')
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('90')).toBeInTheDocument()
  })

  test('should initially clamp values', () => {
    renderWithProviders(
      <RangeSliderInput min={0} max={100} value={[-99, 200]} />,
    )

    const [cursorA, cursorB] = screen.getAllByRole('slider')

    expect(cursorA).toHaveStyle('left: 0%')
    expect(cursorB).toHaveStyle('left: 100%')
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  test('should work well for negative values', () => {
    renderWithProviders(
      <RangeSliderInput min={-200} max={-100} value={[-190, -110]} />,
    )

    const [cursorA, cursorB] = screen.getAllByRole('slider')

    expect(cursorA).toHaveStyle('left: 10%')
    expect(cursorB).toHaveStyle('left: 90%')
    expect(screen.getByText('-190')).toBeInTheDocument()
    expect(screen.getByText('-110')).toBeInTheDocument()
  })

  test('should be controlled correctly', () => {
    const { rerender } = renderWithProviders(
      <RangeSliderInput min={0} max={100} value={[10, 90]} />,
    )

    const [cursorA, cursorB] = screen.getAllByRole('slider')

    expect(cursorA).toHaveStyle('left: 10%')
    expect(cursorB).toHaveStyle('left: 90%')
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('90')).toBeInTheDocument()

    rerender(<RangeSliderInput min={20} max={200} value={[20, 200]} />)

    expect(cursorA).toHaveStyle('left: 0%')
    expect(cursorB).toHaveStyle('left: 100%')
    expect(screen.getByText('20')).toBeInTheDocument()
    expect(screen.getByText('200')).toBeInTheDocument()
  })

  test('onChanged should be called', () => {
    renderWithProviders(
      <RangeSliderInput
        min={0}
        max={2000}
        value={[0, 1000]}
        onChange={mockedOnChange}
      />,
    )

    userEvent.tab()
    userEvent.keyboard('{arrowup}')
    expect(mockedOnChange).toHaveBeenCalledTimes(1)
    expect(mockedOnChange).toHaveBeenLastCalledWith([1, 1000])

    userEvent.keyboard('{ctrl}{arrowup}')
    expect(mockedOnChange).toHaveBeenCalledTimes(2)
    expect(mockedOnChange).toHaveBeenLastCalledWith([11, 1000])

    userEvent.keyboard('{shift}{arrowup}')
    expect(mockedOnChange).toHaveBeenCalledTimes(3)
    expect(mockedOnChange).toHaveBeenLastCalledWith([111, 1000])

    userEvent.keyboard('{ctrl}{shift}{arrowup}')
    expect(mockedOnChange).toHaveBeenCalledTimes(4)
    expect(mockedOnChange).toHaveBeenLastCalledWith([1000, 1111])

    userEvent.keyboard('{ctrl}{shift}{arrowup}')
    expect(mockedOnChange).toHaveBeenCalledTimes(5)
    expect(mockedOnChange).toHaveBeenLastCalledWith([1000, 2000])

    userEvent.keyboard('{ctrl}{shift}{arrowdown}')
    expect(mockedOnChange).toHaveBeenCalledTimes(6)
    expect(mockedOnChange).toHaveBeenLastCalledWith([1000, 1000])

    userEvent.keyboard('{shift}{arrowdown}')
    expect(mockedOnChange).toHaveBeenCalledTimes(7)
    expect(mockedOnChange).toHaveBeenLastCalledWith([900, 1000])

    userEvent.keyboard('{ctrl}{shift}{arrowdown}')
    expect(mockedOnChange).toHaveBeenCalledTimes(8)
    expect(mockedOnChange).toHaveBeenLastCalledWith([0, 1000])
  })

  test('arrow keys should control cursors correctly', () => {
    renderWithProviders(
      <RangeSliderInput min={0} max={2000} value={[0, 1000]} />,
    )

    const [cursorA, cursorB] = screen.getAllByRole('slider')

    userEvent.tab()
    userEvent.keyboard('{arrowup}')
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(cursorA).toHaveAttribute('aria-valuenow', '1')
    expect(screen.getByText('1000')).toBeInTheDocument()
    expect(cursorB).toHaveAttribute('aria-valuenow', '1000')

    userEvent.keyboard('{ctrl}{arrowup}')
    expect(screen.getByText('11')).toBeInTheDocument()
    expect(cursorA).toHaveAttribute('aria-valuenow', '11')
    expect(screen.getByText('1000')).toBeInTheDocument()
    expect(cursorB).toHaveAttribute('aria-valuenow', '1000')

    userEvent.keyboard('{shift}{arrowup}')
    expect(screen.getByText('111')).toBeInTheDocument()
    expect(cursorA).toHaveAttribute('aria-valuenow', '111')
    expect(screen.getByText('1000')).toBeInTheDocument()
    expect(cursorB).toHaveAttribute('aria-valuenow', '1000')

    userEvent.keyboard('{ctrl}{shift}{arrowup}')
    expect(screen.getByText('1111')).toBeInTheDocument()
    expect(cursorA).toHaveAttribute('aria-valuenow', '1111')
    expect(screen.getByText('1000')).toBeInTheDocument()
    expect(cursorB).toHaveAttribute('aria-valuenow', '1000')

    userEvent.keyboard('{arrowdown}')
    expect(screen.getByText('1110')).toBeInTheDocument()
    expect(cursorA).toHaveAttribute('aria-valuenow', '1110')
    expect(screen.getByText('1000')).toBeInTheDocument()
    expect(cursorB).toHaveAttribute('aria-valuenow', '1000')

    userEvent.keyboard('{ctrl}{arrowdown}')
    expect(screen.getByText('1100')).toBeInTheDocument()
    expect(cursorA).toHaveAttribute('aria-valuenow', '1100')
    expect(screen.getByText('1000')).toBeInTheDocument()
    expect(cursorB).toHaveAttribute('aria-valuenow', '1000')

    userEvent.keyboard('{shift}{arrowdown}')
    expect(cursorA).toHaveAttribute('aria-valuenow', '1000')

    userEvent.keyboard('{ctrl}{shift}{arrowdown}')
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(cursorA).toHaveAttribute('aria-valuenow', '0')
    expect(screen.getByText('1000')).toBeInTheDocument()
    expect(cursorB).toHaveAttribute('aria-valuenow', '1000')

    userEvent.keyboard('{arrowright}')
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(cursorA).toHaveAttribute('aria-valuenow', '1')
    expect(screen.getByText('1000')).toBeInTheDocument()
    expect(cursorB).toHaveAttribute('aria-valuenow', '1000')

    userEvent.keyboard('{ctrl}{arrowright}')
    expect(screen.getByText('11')).toBeInTheDocument()
    expect(cursorA).toHaveAttribute('aria-valuenow', '11')
    expect(screen.getByText('1000')).toBeInTheDocument()
    expect(cursorB).toHaveAttribute('aria-valuenow', '1000')

    userEvent.keyboard('{shift}{arrowright}')
    expect(screen.getByText('111')).toBeInTheDocument()
    expect(cursorA).toHaveAttribute('aria-valuenow', '111')
    expect(screen.getByText('1000')).toBeInTheDocument()
    expect(cursorB).toHaveAttribute('aria-valuenow', '1000')

    userEvent.keyboard('{ctrl}{shift}{arrowright}')
    expect(screen.getByText('1111')).toBeInTheDocument()
    expect(cursorA).toHaveAttribute('aria-valuenow', '1111')
    expect(screen.getByText('1000')).toBeInTheDocument()
    expect(cursorB).toHaveAttribute('aria-valuenow', '1000')

    userEvent.keyboard('{ctrl}{shift}{arrowright}')
    expect(screen.getByText('2000')).toBeInTheDocument()
    expect(cursorA).toHaveAttribute('aria-valuenow', '2000')
    expect(screen.getByText('1000')).toBeInTheDocument()
    expect(cursorB).toHaveAttribute('aria-valuenow', '1000')

    userEvent.keyboard('{ctrl}{arrowleft}')
    expect(screen.getByText('1990')).toBeInTheDocument()
    expect(cursorA).toHaveAttribute('aria-valuenow', '1990')
    expect(screen.getByText('1000')).toBeInTheDocument()
    expect(cursorB).toHaveAttribute('aria-valuenow', '1000')

    userEvent.keyboard('{ctrl}{shift}{arrowleft}')
    expect(screen.getByText('990')).toBeInTheDocument()
    expect(cursorA).toHaveAttribute('aria-valuenow', '990')
    expect(screen.getByText('1000')).toBeInTheDocument()
    expect(cursorB).toHaveAttribute('aria-valuenow', '1000')

    userEvent.keyboard('{ctrl}{shift}{arrowleft}')
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(cursorA).toHaveAttribute('aria-valuenow', '0')
    expect(screen.getByText('1000')).toBeInTheDocument()
    expect(cursorB).toHaveAttribute('aria-valuenow', '1000')
  })
})
