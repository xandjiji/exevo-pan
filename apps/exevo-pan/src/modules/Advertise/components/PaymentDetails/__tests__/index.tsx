import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import { useForm } from '../../../contexts/Form'
import { FormValues } from '../../../contexts/Form/types'
import { calculatePrice, readablePrice } from '../../../utils'
import PaymentDetails from '..'
import { mockedFormValues } from './mock'

jest.mock('../../../contexts/Form', () => ({
  useForm: jest.fn(),
}))

const mockedUseForm = useForm as jest.MockedFunction<typeof useForm>

const DAYS_COUNT = mockedFormValues.selectedDates.length

describe('<PaymentDetails />', () => {
  beforeEach(() => {
    mockedUseForm.mockClear()
    mockedUseForm.mockImplementation(
      () => ({ ...mockedFormValues } as FormValues),
    )
  })

  test('email and transaction uuid should be displayed', () => {
    renderWithProviders(<PaymentDetails />)
    expect(screen.getByText(mockedFormValues.uuid)).toBeInTheDocument()
    expect(screen.getByText(mockedFormValues.email.value)).toBeInTheDocument()
  })

  test('should render all data for TIBIA_COINS correctly', () => {
    renderWithProviders(<PaymentDetails />)

    expect(
      screen.getByText(
        readablePrice.full.TIBIA_COINS(
          calculatePrice({
            days: DAYS_COUNT,
            paymentMethod: 'TIBIA_COINS',
            isPro: mockedFormValues.isPro,
          }).totalPrice,
        ),
        { exact: false },
      ),
    ).toBeInTheDocument()
    expect(screen.getByText('Ksu', { exact: false })).toBeInTheDocument()
    expect(screen.getByText('Bubble', { exact: false })).toBeInTheDocument()
  })

  test('should render all data for PIX correctly', async () => {
    mockedUseForm.mockImplementation(
      () => ({ ...mockedFormValues, paymentMethod: 'PIX' } as FormValues),
    )

    renderWithProviders(<PaymentDetails />)

    await waitFor(() => {
      expect(screen.getByRole('img', { name: 'QR Code' })).toHaveAttribute(
        'src',
      )
    })
  })
})
