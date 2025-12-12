import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import PixPayment from '..'

jest.mock('../../../../contexts/Form', () => ({
  useForm: () => ({
    paymentCharacter: {
      value: 'Bubble',
    },
    selectedDates: ['10/21/2021', '10/22/2021'],
  }),
}))

describe('<PixPayment />', () => {
  test('should render qr code correctly', async () => {
    renderWithProviders(<PixPayment isPro={false} />)

    await waitFor(() => {
      expect(screen.getByRole('img')).toHaveAttribute('src')
    })
  })
})
