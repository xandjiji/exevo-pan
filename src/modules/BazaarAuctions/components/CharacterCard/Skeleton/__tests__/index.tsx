import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import CardSkeleton from '..'

describe('<CardSkeleton />', () => {
  test('smoke test', () => {
    renderWithProviders(<CardSkeleton data-testid="element" />)
    expect(screen.getByTestId('element')).toBeInTheDocument()
  })
})
