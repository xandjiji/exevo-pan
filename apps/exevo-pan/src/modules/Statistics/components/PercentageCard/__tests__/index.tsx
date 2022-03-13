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

  test('should display values correctly', () => {
    const { rerender } = renderWithProviders(
      <PercentageCard title="Auction success rate" percentage={0} />,
    )

    expect(screen.getByText(/0/)).toBeInTheDocument()

    rerender(<PercentageCard title="Auction success rate" percentage={1} />)
    expect(screen.getByText(/1/)).toBeInTheDocument()

    rerender(<PercentageCard title="Auction success rate" percentage={10} />)
    expect(screen.getByText(/10/)).toBeInTheDocument()

    rerender(<PercentageCard title="Auction success rate" percentage={0.1} />)
    expect(screen.getByText(/0\.1/)).toBeInTheDocument()

    rerender(<PercentageCard title="Auction success rate" percentage={100} />)
    expect(screen.getByText(/100/)).toBeInTheDocument()

    rerender(<PercentageCard title="Auction success rate" percentage={1000} />)
    expect(screen.getByText(/1000/)).toBeInTheDocument()
  })

  test('should style values correctly', () => {
    const { rerender } = renderWithProviders(
      <PercentageCard title="Auction success rate" percentage={0} />,
    )

    const percentageElement = screen.getByText(/0/)
    /* expect(percentageElement).toHaveStyle('color: #C51313;') */
    expect(percentageElement).toMatchSnapshot()

    rerender(<PercentageCard title="Auction success rate" percentage={50} />)
    /* expect(percentageElement).toHaveStyle('color: #377712;') */
    expect(percentageElement).toMatchSnapshot()

    rerender(<PercentageCard title="Auction success rate" percentage={100} />)
    /* expect(percentageElement).toHaveStyle('color: #377712;') */
    expect(percentageElement).toMatchSnapshot()

    rerender(<PercentageCard title="Auction success rate" percentage={1000} />)
    /* expect(percentageElement).toHaveStyle('color: #377712;') */
    expect(percentageElement).toMatchSnapshot()

    rerender(<PercentageCard title="Auction success rate" percentage={0.1} />)
    /* expect(percentageElement).toHaveStyle('color: #C51313;') */
    expect(percentageElement).toMatchSnapshot()

    rerender(
      <PercentageCard title="Auction success rate" percentage={49.9999} />,
    )
    /* expect(percentageElement).toHaveStyle('color: #C51313;') */
    expect(percentageElement).toMatchSnapshot()
  })
})
