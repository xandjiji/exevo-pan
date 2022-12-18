import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import LabeledCard from '..'

describe('<LabeledCard />', () => {
  test('should render its contents correctly', () => {
    renderWithProviders(
      <LabeledCard data-testid="container">
        <div role="none" />
      </LabeledCard>,
    )

    expect(screen.getByTestId('container')).toHaveClass('bg-background')
    expect(screen.getByRole('none')).toBeInTheDocument()
  })

  test('should render its contents correctly', () => {
    renderWithProviders(
      <LabeledCard noBackground data-testid="container">
        <div role="none" />
      </LabeledCard>,
    )

    expect(screen.getByTestId('container')).not.toHaveClass('bg-background')
    expect(screen.getByRole('none')).toBeInTheDocument()
  })
})
