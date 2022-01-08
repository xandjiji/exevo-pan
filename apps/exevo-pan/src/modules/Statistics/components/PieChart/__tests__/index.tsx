import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import PieChart from '..'

import { mockPieDataset } from './mock'

describe('<PieChart />', () => {
  test('should render title correctly', () => {
    renderWithProviders(
      <PieChart title="Vocation distribution" pieDataSet={mockPieDataset} />,
    )

    expect(screen.getByRole('heading')).toHaveTextContent(
      'Vocation distribution',
    )
  })
})
