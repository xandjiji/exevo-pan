import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import PercentageCard from '..'

describe('<PercentageCard />', () => {
  test('should render every text content', () => {
    renderWithProviders(
      <PercentageCard title="Auction success rate" percentage={55.13} />,
    )

    expect(screen.getByText(/55\.13/)).toBeInTheDocument()
    expect(screen.getByRole('heading')).toHaveTextContent(
      'Auction success rate',
    )
  })

  test.todo('should display values correctly')
  test.todo('should style values correctly')
})
