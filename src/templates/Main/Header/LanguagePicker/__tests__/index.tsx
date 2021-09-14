import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import LanguagePicker from '..'

describe('<LanguagePicker />', () => {
  test('should toggle visibility', () => {
    renderWithProviders(<LanguagePicker />)

    const toggleButton = screen.getByRole('button')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    userEvent.click(toggleButton)
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    userEvent.click(toggleButton)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
