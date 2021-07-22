import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import Skeleton from '..'

describe('<Skeleton />', () => {
  test('smoke test', () => {
    renderWithProviders(<Skeleton data-testid="element" />)
    expect(screen.getByTestId('element')).toBeInTheDocument()
  })
})
