import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import ErrorBoundary from '..'

function Bomb({ shouldThrow }) {
  if (shouldThrow) {
    throw new Error('Bomb')
  } else {
    return null
  }
}

describe('<ErrorBoundary />', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  test('on error, should render error boundary fallback page', () => {
    const { rerender } = renderWithProviders(
      <ErrorBoundary>
        <Bomb shouldThrow={false} />
      </ErrorBoundary>,
    )

    rerender(
      <ErrorBoundary>
        <Bomb shouldThrow={true} />
      </ErrorBoundary>,
    )

    expect(console.error).toHaveBeenCalledTimes(2)
    expect(screen.getByRole('alert')).toHaveAttribute(
      'aria-label',
      'Error, something unexpected happened',
    )
  })
})
