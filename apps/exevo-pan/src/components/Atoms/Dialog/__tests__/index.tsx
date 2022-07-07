import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, assertNoA11yViolations } from 'utils/test'
import Dialog from '..'

const onCloseMock = jest.fn()

describe('<Dialog />', () => {
  beforeEach(() => {
    onCloseMock.mockClear()
  })

  test('should render its contents correctly', () => {
    renderWithProviders(
      <Dialog isOpen onClose={onCloseMock}>
        <div role="none" />
      </Dialog>,
    )

    expect(screen.getByRole('none')).toBeInTheDocument()
  })

  test('should handle `onClose` calls', () => {
    renderWithProviders(
      <Dialog isOpen onClose={onCloseMock}>
        <div role="none" />
      </Dialog>,
    )

    expect(onCloseMock).toHaveBeenCalledTimes(0)

    userEvent.click(screen.getByRole('button', { name: 'Close dialog' }))
    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })

  test('should be controlled with `isOpen` prop', () => {
    const { rerender } = renderWithProviders(
      <Dialog isOpen onClose={onCloseMock}>
        <div role="none" />
      </Dialog>,
    )

    expect(screen.getByRole('none')).toBeInTheDocument()

    rerender(
      <Dialog isOpen={false} onClose={onCloseMock}>
        <div role="none" />
      </Dialog>,
    )

    expect(screen.queryByRole('none')).not.toBeInTheDocument()
  })

  test('should not render close button', () => {
    renderWithProviders(
      <Dialog isOpen onClose={onCloseMock} noCloseButton>
        <div role="none" />
      </Dialog>,
    )

    expect(
      screen.queryByRole('button', { name: 'Close dialog' }),
    ).not.toBeInTheDocument()
  })

  test('a11y', async () => {
    const { container } = renderWithProviders(
      <Dialog isOpen onClose={onCloseMock}>
        <div role="none" />
      </Dialog>,
    )

    await assertNoA11yViolations(container)
  })
})
