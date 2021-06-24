import { render, screen } from '@testing-library/react'
import RangeSliderInput from '..'

describe('<RangeSliderInput />', () => {
  test('should render correctly', () => {
    render(<RangeSliderInput data-testid="test" min={0} max={100} />)
    expect(screen.getByTestId('test')).toBeInTheDocument()
  })
})
