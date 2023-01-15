import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import Alert from '..'

describe('<Alert />', () => {
  test('should render correctly', () => {
    const { container } = renderWithProviders(
      <Alert variant="alert">content</Alert>,
    )

    expect(screen.getByRole('alert')).toHaveTextContent('content')
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  test('should render custom icon', () => {
    renderWithProviders(
      <Alert variant="alert" icon={() => <svg role="none" />}>
        content
      </Alert>,
    )

    expect(screen.getByRole('none')).toBeInTheDocument()
  })

  test('should NOT render custom icon', () => {
    const { container } = renderWithProviders(
      <Alert variant="alert" noIcon>
        content
      </Alert>,
    )

    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })
})
