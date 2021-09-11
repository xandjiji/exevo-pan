import { renderWithProviders } from 'utils/test'
import SearchGrid from '..'

describe('<SearchGrid />', () => {
  test('should render', () => {
    const { container } = renderWithProviders(<SearchGrid />)
    expect(container).toMatchSnapshot()
  })
})
