import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import TransactionId from '..'

describe('<TransactionId />', () => {
  test('should render children content', () => {
    renderWithProviders(<TransactionId>test id</TransactionId>)

    expect(screen.getByText('test id')).toBeInTheDocument()
  })
})
