import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import FormError from '..'

describe('<FormError />', () => {
  test('should toggle its visibility', () => {
    const { rerender } = renderWithProviders(
      <FormError id="element-id" error="content" />,
    )

    const errorElement = screen.getByRole('alert')
    expect(errorElement).toHaveTextContent('content')
    expect(errorElement).toHaveAttribute('id', 'element-id')

    rerender(<FormError id="element-id" />)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()

    rerender(<FormError id="element-id" error />)
    expect(screen.queryByRole('alert')).toBeInTheDocument()

    rerender(<FormError id="element-id" error={false} />)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()

    rerender(<FormError id="element-id" error="" />)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
