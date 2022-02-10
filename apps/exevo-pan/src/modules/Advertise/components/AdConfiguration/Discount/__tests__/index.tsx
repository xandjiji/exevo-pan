import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import Discount from '..'

describe('<Discount />', () => {
  test('the tier and discount values should be correct', () => {
    const { rerender } = renderWithProviders(
      <Discount daysCount={0} paymentMethod="TIBIA_COINS" />,
    )
    const tagElement = screen.getByText('-0%')
    const tierElement = screen.getByText('Tier 1')
    expect(tierElement).toBeInTheDocument()
    expect(tagElement).not.toBeVisible()

    rerender(<Discount daysCount={1} paymentMethod="TIBIA_COINS" />)
    expect(tierElement).toHaveTextContent('Tier 1')
    expect(tagElement).toHaveTextContent('-0%')
    expect(tagElement).not.toBeVisible()

    rerender(<Discount daysCount={2} paymentMethod="TIBIA_COINS" />)
    expect(tierElement).toHaveTextContent('Tier 2')
    expect(tagElement).toHaveTextContent('-17%')
    expect(tagElement).toBeVisible()

    rerender(<Discount daysCount={3} paymentMethod="TIBIA_COINS" />)
    expect(tierElement).toHaveTextContent('Tier 2')
    expect(tagElement).toHaveTextContent('-22%')
    expect(tagElement).toBeVisible()

    rerender(<Discount daysCount={4} paymentMethod="TIBIA_COINS" />)
    expect(tierElement).toHaveTextContent('Tier 2')
    expect(tagElement).toHaveTextContent('-25%')
    expect(tagElement).toBeVisible()

    rerender(<Discount daysCount={5} paymentMethod="TIBIA_COINS" />)
    expect(tierElement).toHaveTextContent('Tier 3')
    expect(tagElement).toHaveTextContent('-33%')
    expect(tagElement).toBeVisible()

    rerender(<Discount daysCount={6} paymentMethod="TIBIA_COINS" />)
    expect(tierElement).toHaveTextContent('Tier 3')
    expect(tagElement).toHaveTextContent('-33%')
    expect(tagElement).toBeVisible()

    rerender(<Discount daysCount={100} paymentMethod="TIBIA_COINS" />)
    expect(tierElement).toHaveTextContent('Tier 3')
    expect(tagElement).toHaveTextContent('-33%')
    expect(tagElement).toBeVisible()
  })
})
