import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import { advertising } from 'Constants'
import CoinsPayment from '..'
import { mockedFormValues } from './mock'

jest.mock('../../../../contexts/Form', () => ({
  useForm: () => mockedFormValues,
}))

const DAYS_COUNT = mockedFormValues.selectedDates.length

describe('<CoinsPayment />', () => {
  test('should render all data correctly', () => {
    renderWithProviders(<CoinsPayment />)

    expect(
      screen.getByText(
        `${DAYS_COUNT * advertising.TIBIA_COINS_ADVERTISE} Tibia Coins`,
        { exact: false },
      ),
    ).toBeInTheDocument()
    expect(screen.getByText('Ksu', { exact: false })).toBeInTheDocument()
    expect(screen.getByText('Bubble', { exact: false })).toBeInTheDocument()
  })
})
