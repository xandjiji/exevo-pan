import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import CoinsPayment from '..'

jest.mock('../../../../contexts/Form', () => ({
  useForm: () => ({
    paymentCharacter: {
      value: 'Bubble',
    },
    selectedDates: ['10/21/2021', '10/22/2021'],
  }),
}))

describe('<CoinsPayment />', () => {
  test('should render all data correctly', () => {
    renderWithProviders(<CoinsPayment />)

    expect(
      screen.getByText('100 Tibia Coins', { exact: false }),
    ).toBeInTheDocument()
    expect(screen.getByText('Ksu', { exact: false })).toBeInTheDocument()
    expect(screen.getByText('Bubble', { exact: false })).toBeInTheDocument()
  })
})
