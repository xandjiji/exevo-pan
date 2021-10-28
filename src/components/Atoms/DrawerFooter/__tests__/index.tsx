import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import DrawerFooter from '..'

describe('<DrawerFooter />', () => {
  test('it renders correctly', () => {
    renderWithProviders(<DrawerFooter data-testid="testid" />)

    expect(screen.getByTestId('testid')).toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(2)
  })
})
