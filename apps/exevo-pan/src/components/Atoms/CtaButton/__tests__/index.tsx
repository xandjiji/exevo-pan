import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import CtaButton from '..'

describe('<CtaButton />', () => {
  test('it renders correctly', () => {
    renderWithProviders(<CtaButton data-testid="testid" />)
    expect(screen.getByTestId('testid')).toBeInTheDocument()
  })
})
