import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import { WrappedFilterDrawer } from './mock'

jest.mock('hooks/useIsMounted', () => jest.fn().mockReturnValue(true))

describe('<FilterDrawer />', () => {
  beforeEach(() => {
    jest.useFakeTimers()

    jest
      .spyOn(window, 'setTimeout')
      .mockImplementationOnce((fn) => fn() as unknown as NodeJS.Timeout)
  })

  test('drawer visibility should be controlled correctly', () => {
    const { rerender } = renderWithProviders(<WrappedFilterDrawer open />)

    const drawerElement = screen.getByRole('dialog')
    expect(drawerElement).toBeVisible()

    rerender(<WrappedFilterDrawer open={false} />)
    expect(drawerElement).not.toBeVisible()

    rerender(<WrappedFilterDrawer open />)
    expect(drawerElement).toBeVisible()
  })

  test('should call onClose', () => {
    const mockedOnClose = jest.fn()
    renderWithProviders(<WrappedFilterDrawer onClose={mockedOnClose} />)

    expect(mockedOnClose).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByLabelText('Close drawer'))
    expect(mockedOnClose).toHaveBeenCalledTimes(1)
  })

  test.todo('should update filters')

  test.todo('should toggle all options')

  test.todo('should control reset button based on active filter count')

  test.todo('autocompleteInputs should control its chips/options correctly')

  test.todo('should reset filters')
})
