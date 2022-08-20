import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import StaminaBar from '..'

describe('<StaminaBar />', () => {
  test.todo('the stamina bar should have the correct width')

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
    test.todo('green')

    test.todo('orange')

    test.todo('yellow')
  })
})
