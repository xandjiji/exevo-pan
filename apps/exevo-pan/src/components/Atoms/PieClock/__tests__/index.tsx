import { renderWithProviders } from 'utils/test'
import PieClock from '..'

describe('<PieClock />', () => {
  test('should render all variants', () => {
    const { rerender } = renderWithProviders(<PieClock percentage={0.4} />)
    rerender(<PieClock percentage={0.7} />)
    rerender(<PieClock percentage={0.7} invert />)
    rerender(<PieClock percentage={0.4} invert />)

    rerender(<PieClock percentage={0.4} size="small" />)
    rerender(<PieClock percentage={0.4} size="large" />)
  })
})
