/* eslint-disable */
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import useEscToClose from '..'

const onCloseMock = jest.fn()

const Component = ({
  open,
  onClose,
}: {
  open: boolean
  onClose?: () => void
}): JSX.Element => {
  const { elementToFocusRef, onKeyDown } = useEscToClose({ open, onClose })

  return (
    <>
      <button tabIndex={0} />
      <div
        tabIndex={0}
        onKeyDown={onKeyDown}
        ref={elementToFocusRef}
        data-testid="focus-component"
      />
    </>
  )
}

describe('useEscToClose()', () => {
  beforeEach(() => {
    onCloseMock.mockClear()

    jest
      .spyOn(window, 'setTimeout')
      .mockImplementation((fn) => fn() as unknown as NodeJS.Timeout)
  })

  test('should call onClose with keyboard event', () => {
    renderWithProviders(<Component open onClose={onCloseMock} />)

    expect(onCloseMock).not.toHaveBeenCalled()

    userEvent.keyboard('{esc}')
    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })

  test('should focus element on OPEN', () => {
    const { rerender } = renderWithProviders(<Component open={false} />)

    const componentToBeFocused = screen.getByTestId('focus-component')
    expect(componentToBeFocused).not.toHaveFocus()

    rerender(<Component open={true} />)
    expect(componentToBeFocused).toHaveFocus()
  })
})
