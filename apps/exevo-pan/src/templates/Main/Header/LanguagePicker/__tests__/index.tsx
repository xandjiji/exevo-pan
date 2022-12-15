import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import LanguagePicker from '..'

describe('<LanguagePicker />', () => {
  test('should toggle visibility', () => {
    renderWithProviders(<LanguagePicker />)

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()

    userEvent.click(screen.getByRole('button', { name: 'Change language' }))
    expect(screen.getByRole('menu')).toBeInTheDocument()

    userEvent.click(screen.getByRole('button', { name: 'Close dialog' }))
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })
})
