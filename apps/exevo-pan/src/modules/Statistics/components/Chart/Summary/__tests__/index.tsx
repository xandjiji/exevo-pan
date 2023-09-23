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

  test('should style trend icon red/green', () => {
    const { rerender } = renderWithProviders(
      <Summary title="Total volume" value={1000} percentage={50} />,
    )

    const textElement = screen.getByText(/50\.00%/)

    /* expect(textElement).toHaveStyle('color: #377712') */
    expect(textElement).toMatchSnapshot()
    /* expect(screen.getByLabelText('Upwards trend')).toHaveStyle('fill: #377712') */
    expect(screen.getByLabelText('Upwards trend')).toMatchInlineSnapshot(`
      <svg
        aria-label="Upwards trend"
        class="mr-1 h-4 w-4 fill-green"
        style="transform: none;"
        viewBox="0 0 24 24"
      >
        <path
          d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"
        />
      </svg>
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
    /* expect(screen.getByLabelText('Downwards trend')).toHaveStyle(
      'fill: #C51313',
    ) */
    expect(screen.getByLabelText('Downwards trend')).toMatchSnapshot()

    rerender(
      <Summary title="Total volume" value={1000} percentage={50} positive />,
    )

    /* expect(textElement).toHaveStyle('color: #377712') */
    expect(textElement).toMatchSnapshot()
    /* expect(screen.getByLabelText('Upwards trend')).toHaveStyle('fill: #377712') */
    expect(screen.getByLabelText('Upwards trend')).toMatchSnapshot()
  })
})
