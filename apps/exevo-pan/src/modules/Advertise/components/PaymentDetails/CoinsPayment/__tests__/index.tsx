import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import CoinsPayment from '..'
import { calculatePrice, readablePrice } from '../../../../utils'
import { mockedFormValues } from './mock'

jest.mock('../../../../contexts/Form', () => ({
  useForm: () => mockedFormValues,
}))

const DAYS_COUNT = mockedFormValues.selectedDates.length

describe('<CoinsPayment />', () => {
  test('should render all data correctly', () => {
    renderWithProviders(<CoinsPayment isPro={false} />)

    expect(
      screen.getByTitle(
        readablePrice.full.TIBIA_COINS(
          calculatePrice({
            days: DAYS_COUNT,
            paymentMethod: 'TIBIA_COINS',
            isPro: false,
          }).totalPrice,
        ),
        { exact: false },
      ),
    ).toBeInTheDocument()
    expect(screen.getByText('Ksu', { exact: false })).toBeInTheDocument()
    expect(screen.getByText('Bubble', { exact: false })).toBeInTheDocument()
  })
})
