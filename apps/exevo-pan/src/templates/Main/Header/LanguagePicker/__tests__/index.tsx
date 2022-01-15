import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import LanguagePicker from '..'

describe('<LanguagePicker />', () => {
  test('should toggle visibility', () => {
    const mockToggle = jest.fn()
    const { rerender } = renderWithProviders(
      <LanguagePicker isOpen={false} setLanguageOpen={mockToggle} />,
    )

    const toggleButton = screen.getByRole('button')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(mockToggle).toHaveBeenCalledTimes(0)

    userEvent.click(toggleButton)
    expect(mockToggle).toHaveBeenCalledTimes(1)
    rerender(<LanguagePicker isOpen setLanguageOpen={mockToggle} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    userEvent.click(toggleButton)
    expect(mockToggle).toHaveBeenCalledTimes(2)
    rerender(<LanguagePicker isOpen={false} setLanguageOpen={mockToggle} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
