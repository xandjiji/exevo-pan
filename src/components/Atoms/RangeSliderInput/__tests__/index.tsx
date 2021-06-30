import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import RangeSliderInput from '..'

describe('<RangeSliderInput />', () => {
  test('should render correctly', () => {
    renderWithProviders(
      <RangeSliderInput data-testid="test" min={0} max={100} />,
    )
    expect(screen.getByTestId('test')).toBeInTheDocument()
  })

  test('should render cursors correctly', () => {
    renderWithProviders(<RangeSliderInput min={0} max={100} value={[10, 90]} />)

    const [cursorA, cursorB] = screen.getAllByRole('slider')

    expect(cursorA).toHaveStyle('left: 10%')
    expect(cursorB).toHaveStyle('left: 90%')
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('90')).toBeInTheDocument()
  })

  test('should clamp values', () => {
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
})
