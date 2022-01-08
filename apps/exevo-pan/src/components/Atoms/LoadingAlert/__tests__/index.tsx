import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import LoadingAlert from '..'

describe('<LoadingAlert />', () => {
  test('it renders correctly', () => {
    renderWithProviders(
      <LoadingAlert aria-label="Loading data">Updating data...</LoadingAlert>,
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Updating data...')
    expect(screen.getByLabelText('Loading data')).toBeInTheDocument()
  })
})
