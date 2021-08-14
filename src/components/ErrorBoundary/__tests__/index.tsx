/* eslint-disable no-console */
import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import ErrorBoundary from '..'

function Bomb({ shouldThrow }: { shouldThrow: boolean }) {
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

    jest.clearAllMocks()
    rerender(
      <ErrorBoundary>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    )

    expect(console.error).toHaveBeenCalledTimes(3)
    expect(screen.getByRole('alert')).toHaveAttribute(
      'aria-label',
      'Error, something unexpected happened',
    )
  })
})
