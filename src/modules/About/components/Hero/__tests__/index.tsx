import { renderWithProviders } from 'utils/test'
import Hero from '..'

describe('<Hero />', () => {
  test('should render correctly', () => {
    const { container } = renderWithProviders(<Hero />)

    expect(container).toBeInTheDocument()
  })
})
