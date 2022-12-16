import { screen } from '@testing-library/react'
import { renderWithProviders, assertNoA11yViolations } from 'utils/test'
import LoadingAlert from '..'

describe('<LoadingAlert />', () => {
  test('it renders correctly', () => {
    renderWithProviders(
      <LoadingAlert aria-label="Loading data">Updating data...</LoadingAlert>,
    )

    const [alertElement] = screen.getAllByRole('alert')

    expect(alertElement).toHaveTextContent('Updating data...')
    expect(screen.getByLabelText('Loading data')).toBeInTheDocument()
  })

  test('a11y', async () => {
    const { container } = renderWithProviders(
      <LoadingAlert aria-label="Loading data">Updating data...</LoadingAlert>,
    )
    await assertNoA11yViolations(container)
  })
})
