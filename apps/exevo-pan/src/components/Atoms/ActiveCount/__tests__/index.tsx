import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import ActiveCount from '..'

describe('<ActiveCount />', () => {
  test('should render its contents correctly', () => {
    renderWithProviders(<ActiveCount role="none">content</ActiveCount>)

    expect(screen.getByText('content')).toBeInTheDocument()
    expect(screen.getByRole('none')).toBeInTheDocument()
  })
})
