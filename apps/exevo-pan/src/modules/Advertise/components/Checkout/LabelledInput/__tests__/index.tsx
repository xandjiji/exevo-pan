import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import LabelledInput from '..'

describe('<LabelledInput />', () => {
  test('should render all props correctly', () => {
    renderWithProviders(
      <LabelledInput
        id="test-id"
        labelText="Email"
        placeholder="your@email.com"
      />,
    )

    const inputElement = screen.getByLabelText('Email')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('placeholder', 'your@email.com')
    expect(inputElement).toHaveAttribute('id', 'test-id')

    expect(screen.getByText('Email')).toHaveAttribute('for', 'test-id')
  })

  test('should change icons according to the validation state', () => {
    const { rerender } = renderWithProviders(
      <LabelledInput
        id="test-id"
        labelText="Email"
        validationState="loading"
      />,
    )
    expect(screen.getByLabelText('Validating...')).toBeInTheDocument()

    rerender(
      <LabelledInput id="test-id" labelText="Email" validationState="valid" />,
    )
    expect(screen.getByLabelText('Field is valid')).toBeInTheDocument()

    rerender(
      <LabelledInput
        id="test-id"
        labelText="Email"
        validationState="invalid"
      />,
    )
    const iconElement = screen.getByLabelText('Field is invalid')
    expect(iconElement).toBeInTheDocument()

    rerender(
      <LabelledInput
        id="test-id"
        labelText="Email"
        validationState="neutral"
      />,
    )
    expect(iconElement).not.toBeVisible()

    rerender(<LabelledInput id="test-id" labelText="Email" />)
    expect(iconElement).not.toBeVisible()
  })
})
