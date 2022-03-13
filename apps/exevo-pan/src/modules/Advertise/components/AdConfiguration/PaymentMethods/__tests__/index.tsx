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

    const tibiaCoinsButton = screen.getByRole('button', { name: 'Tibia Coins' })
    const pixButton = screen.getByRole('button', { name: 'Pix' })

    expect(tibiaCoinsButton).toHaveAttribute('aria-selected', 'true')
    expect(pixButton).toHaveAttribute('aria-selected', 'false')

    userEvent.click(pixButton)
    expect(tibiaCoinsButton).toHaveAttribute('aria-selected', 'false')
    expect(pixButton).toHaveAttribute('aria-selected', 'true')
  })
})
