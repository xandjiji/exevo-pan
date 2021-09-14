import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import Summary from '..'

describe('<Summary />', () => {
  test('should render values correctly', () => {
    renderWithProviders(
      <Summary title="Total volume" value={1000} percentage={50} />,
    )

    expect(
      screen.getByRole('heading', {
        name: 'Total volume',
      }),
    ).toBeInTheDocument()

    expect(screen.getByText('1,000 TC')).toBeInTheDocument()
    expect(screen.getByText(/50\.00%/)).toBeInTheDocument()
  })

  test('should style trend red/green', () => {
    const { rerender } = renderWithProviders(
      <Summary title="Total volume" value={1000} percentage={50} />,
    )

    const textElement = screen.getByText(/50\.00%/)

    /* expect(textElement).toHaveStyle('color: #377712') */
    expect(textElement).toMatchSnapshot()
    /* expect(screen.getByLabelText('Summary.positiveTrendLabel')).toHaveStyle('fill: #377712') */
    expect(screen.getByLabelText('Summary.positiveTrendLabel'))
      .toMatchInlineSnapshot(`
      <image
        aria-label="Summary.positiveTrendLabel"
        class="styles__TrendIcon-sc-zf1m03-3 efoYRJ"
      />
    `)

    rerender(
      <Summary
        title="Total volume"
        value={1000}
        percentage={50}
        positive={false}
      />,
    )

    /* expect(textElement).toHaveStyle('color: #C51313') */
    expect(textElement).toMatchSnapshot()
    /* expect(screen.getByLabelText('Summary.negativeTrendLabel')).toHaveStyle(
      'fill: #C51313',
    ) */
    expect(
      screen.getByLabelText('Summary.negativeTrendLabel'),
    ).toMatchSnapshot()

    rerender(
      <Summary title="Total volume" value={1000} percentage={50} positive />,
    )

    /* expect(textElement).toHaveStyle('color: #377712') */
    expect(textElement).toMatchSnapshot()
    /* expect(screen.getByLabelText('Summary.positiveTrendLabel')).toHaveStyle('fill: #377712') */
    expect(
      screen.getByLabelText('Summary.positiveTrendLabel'),
    ).toMatchSnapshot()
  })
})
