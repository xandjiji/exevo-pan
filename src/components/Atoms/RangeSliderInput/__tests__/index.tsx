import { render, screen } from '@testing-library/react'
import RangeSliderInput from '..'

describe('<RangeSliderInput />', () => {
  test('should render correctly', () => {
    render(<RangeSliderInput data-testid="test" min={0} max={100} />)
    expect(screen.getByTestId('test')).toBeInTheDocument()
  })

  test('should render cursors correctly', async () => {
    render(<RangeSliderInput min={0} max={100} value={[10, 90]} />)

    const [cursorA, cursorB] = screen.getAllByRole('slider')

    expect(cursorA).toHaveStyle('left: 10%')
    expect(cursorB).toHaveStyle('left: 90%')
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('90')).toBeInTheDocument()
  })
})
