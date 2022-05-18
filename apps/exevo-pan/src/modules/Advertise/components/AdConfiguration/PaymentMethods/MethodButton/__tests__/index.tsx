import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import MethodButton from '..'

describe('<MethodButton />', () => {
  test('should render its content correctly', () => {
    renderWithProviders(
      <MethodButton active icon={<div role="none" />}>
        test button
      </MethodButton>,
    )

    expect(
      screen.getByRole('radio', { name: 'test button' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('none')).toBeInTheDocument()
  })

  test('should control its state correctly', () => {
    const { rerender } = renderWithProviders(
      <MethodButton active icon={<div role="none" />}>
        test button
      </MethodButton>,
    )

    const buttonElement = screen.getByRole('radio', { name: 'test button' })

    expect(buttonElement).toBeChecked()

    rerender(
      <MethodButton active={false} icon={<div role="none" />}>
        test button
      </MethodButton>,
    )
    expect(buttonElement).not.toBeChecked()
  })
})
