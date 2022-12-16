import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, setup } from 'utils/test'
import LanguagePicker from '..'

const mockedUseRouter = setup.useRouter()

describe('<LanguagePicker />', () => {
  test('should toggle visibility', () => {
    renderWithProviders(<LanguagePicker />)

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()

    userEvent.click(screen.getByRole('button', { name: 'Change language' }))
    expect(screen.getByRole('menu')).toBeInTheDocument()

    userEvent.click(screen.getByRole('button', { name: 'Close dialog' }))
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  test('should select a language', () => {
    const mockedArgs = {
      locale: 'es',
      push: jest.fn(),
      pathname: '',
      query: {},
    }

    mockedUseRouter.mockReturnValue(mockedArgs as any)

    renderWithProviders(<LanguagePicker />)

    userEvent.click(screen.getByRole('button', { name: 'Change language' }))

    const [, spanish, portuguese] = screen.getAllByRole('menuitemradio')

    expect(spanish).toBeChecked()
    expect(mockedArgs.push).toHaveBeenCalledTimes(0)

    userEvent.click(portuguese)
    expect(mockedArgs.push).toHaveBeenCalledTimes(1)
  })
})
