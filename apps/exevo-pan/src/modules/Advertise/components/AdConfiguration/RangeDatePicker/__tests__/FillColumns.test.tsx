import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import FillColumns from '../FillColumns'

describe('<FillColumns />', () => {
  test('should NOT render the fill element', () => {
    const { rerender } = renderWithProviders(<FillColumns amount={0} />)

    expect(screen.queryByRole('none')).not.toBeInTheDocument()

    rerender(<FillColumns amount={7} />)
    expect(screen.queryByRole('none')).not.toBeInTheDocument()
  })

  test.each([1, 2, 3, 4, 5, 6])('should render fill element', (amount) => {
    renderWithProviders(<FillColumns amount={amount} />)

    expect(screen.getByRole('none')).toBeInTheDocument()
  })
})
