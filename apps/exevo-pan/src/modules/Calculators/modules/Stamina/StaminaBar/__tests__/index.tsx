import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import StaminaBar from '..'

describe('<StaminaBar />', () => {
  test('the stamina bar should have the correct width', () => {
    const { rerender } = renderWithProviders(
      <StaminaBar time="32:33" mark="36:30" />,
    )

    const [staminaBar] = screen.getByTitle('36:30').children
    expect(staminaBar).toHaveStyle('width: 78%')

    rerender(<StaminaBar time="00:00" />)

    expect(staminaBar).toHaveStyle('width: 0%')

    rerender(<StaminaBar time="42:00" />)
    expect(staminaBar).toHaveStyle('width: 100%')
  })

  test('the `:` time separator should be blinking', () => {
    renderWithProviders(<StaminaBar time="32:00" blinking />)

    expect(screen.getByText(':')).toHaveClass('animate-blinking')
  })

  test('should display a visual mark at the correct position', () => {
    const { rerender } = renderWithProviders(
      <StaminaBar time="32:00" mark="36:30" />,
    )

    {
      const [, markElement] = screen.getByTitle('36:30').children
      expect(markElement).toHaveStyle('left: 87%')
    }

    {
      rerender(<StaminaBar time="32:00" mark="42:00" />)
      const [, markElement] = screen.getByTitle('42:00').children
      expect(markElement).toHaveStyle('left: 100%')
    }

    {
      rerender(<StaminaBar time="32:00" mark="00:00" />)
      const [, markElement] = screen.getByTitle('00:00').children
      expect(markElement).toHaveStyle('left: 0%')
    }
  })

  describe('should have the correct color', () => {
    test('green', () => {
      renderWithProviders(<StaminaBar time="39:0" mark="42:00" />)

      const [staminaBar] = screen.getByTitle('42:00').children
      expect(staminaBar).toHaveStyle('background-color: rgb(0, 192, 0)')
    })

    test('orange', () => {
      renderWithProviders(<StaminaBar time="14:00" mark="42:00" />)

      const [staminaBar] = screen.getByTitle('42:00').children
      expect(staminaBar).toHaveStyle('background-color: rgb(198, 97, 0)')
    })

    test('yellow', () => {
      renderWithProviders(<StaminaBar time="1:00" mark="42:00" />)

      const [staminaBar] = screen.getByTitle('42:00').children
      expect(staminaBar).toHaveStyle('background-color: rgb(240, 240, 0)')
    })
  })
})
