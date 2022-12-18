import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import { MILLISECONDS_IN } from 'utils'
import RecentlyAppeared from '..'

const today = +new Date() - MILLISECONDS_IN.HOUR * 1
const yesterday = +new Date() - MILLISECONDS_IN.HOUR * 36

describe('<RecentlyAppeared />', () => {
  test('should display recent and not so recent bosses', () => {
    renderWithProviders(
      <RecentlyAppeared
        bosses={[
          { name: 'Yeti', lastAppearence: today },
          { name: 'Munster', lastAppearence: yesterday },
        ]}
      />,
    )

    expect(screen.getByAltText('Yeti')).toBeInTheDocument()
    expect(screen.getByTitle('1 hour ago')).not.toHaveClass('opacity-40')

    expect(screen.getByAltText('Munster')).toBeInTheDocument()
    expect(screen.getByTitle('36 hours ago')).toHaveClass('opacity-40')
  })
})
