import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import { OptionButton } from '..'

describe('<OptionButton />', () => {
  test('should render its content correctly', () => {
    renderWithProviders(
      <OptionButton active icon={<div role="none" />}>
        test button
      </OptionButton>,
    )

    expect(
      screen.getByRole('radio', { name: 'test button' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('none')).toBeInTheDocument()
  })

  test('should control its state correctly', () => {
    const { rerender } = renderWithProviders(
      <OptionButton active icon={<div role="none" />}>
        test button
      </OptionButton>,
    )

    const buttonElement = screen.getByRole('radio', { name: 'test button' })

    expect(buttonElement).toBeChecked()

    rerender(
      <OptionButton active={false} icon={<div role="none" />}>
        test button
      </OptionButton>,
    )
    expect(buttonElement).not.toBeChecked()
  })
})
