import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import RareFrame from '..'

describe('<RareFrame />', () => {
  test('should render correctly', () => {
    renderWithProviders(<RareFrame />)

    expect(screen.getByRole('none')).toBeInTheDocument()
  })
})
