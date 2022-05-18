import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import { FormProvider } from '../../../../contexts/Form'
import PaymentMethods from '..'

describe('<PaymentMethods />', () => {
  test('should dispatch form actions correctly', () => {
    renderWithProviders(
      <FormProvider>
        <PaymentMethods />
      </FormProvider>,
    )

    const tibiaCoinsButton = screen.getByRole('radio', { name: 'Tibia Coins' })
    const pixButton = screen.getByRole('radio', { name: 'Pix' })

    expect(tibiaCoinsButton).toBeChecked()
    expect(pixButton).not.toBeChecked()

    userEvent.click(pixButton)
    expect(tibiaCoinsButton).not.toBeChecked()
    expect(pixButton).toBeChecked()
  })
})
