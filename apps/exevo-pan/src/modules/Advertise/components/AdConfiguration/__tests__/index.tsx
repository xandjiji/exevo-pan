import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import { FormProvider } from '../../../contexts/Form'
import AdConfiguration from '..'

describe('<AdConfiguration />', () => {
  test('should render correctly', () => {
    renderWithProviders(
      <FormProvider>
        <AdConfiguration />
      </FormProvider>,
    )

    expect(
      screen.getByText('Choose the days you want to highlight your auction.'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Tibia Coins' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Pix' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Summary' })).toBeInTheDocument()
  })
})
