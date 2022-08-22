import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import TransferTable from '..'

describe('<TransferTable />', () => {
  test('should render everything correctly', () => {
    renderWithProviders(
      <TransferTable
        transactions={[
          { from: 'me', to: 'you', amount: 1546 },
          { from: 'Ksu', to: 'Ksa', amount: 123 },
        ]}
      />,
    )

    expect(screen.getByText('me')).toBeInTheDocument()
    expect(screen.getByText('you')).toBeInTheDocument()
    expect(screen.getByText('Ksu')).toBeInTheDocument()
    expect(screen.getByText('Ksa')).toBeInTheDocument()

    expect(screen.getByText('1,546')).toBeInTheDocument()
    expect(screen.getByText('123')).toBeInTheDocument()

    expect(screen.getAllByRole('button')).toHaveLength(2)
  })
})
