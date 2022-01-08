import { renderWithProviders } from 'utils/test'
import SkeletonItem from '../SkeletonItem'

describe('<SkeletonItem />', () => {
  test('should render correctly', () => {
    const { container } = renderWithProviders(<SkeletonItem />)

    expect(container.querySelectorAll('div')).toHaveLength(5)
  })
})
