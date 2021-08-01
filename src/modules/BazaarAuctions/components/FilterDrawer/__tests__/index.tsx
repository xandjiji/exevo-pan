import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import FilterDrawer from '..'

jest.mock('lodash', () => ({
  debounce: fn => fn,
}))

const mockOnClose = jest.fn()
const mockSetActiveFilterCount = jest.fn()

const defaultArgs = {
  open: true,
  onClose: mockOnClose,
  setActiveFilterCount: mockSetActiveFilterCount,
}

describe('<FilterDrawer />', () => {
  beforeEach(() => {
    mockOnClose.mockClear()
    mockSetActiveFilterCount.mockClear()

    jest
      .spyOn(window, 'setTimeout')
      .mockImplementationOnce(fn => fn() as unknown as NodeJS.Timeout)
  })

  test('should toggle between open/close', () => {
    const { rerender } = renderWithProviders(<FilterDrawer {...defaultArgs} />)

    const drawerElement = screen.getByRole('dialog')
    expect(drawerElement).toBeVisible()

    rerender(<FilterDrawer {...defaultArgs} open={false} />)
    expect(drawerElement).not.toBeVisible()

    rerender(<FilterDrawer {...defaultArgs} />)
    expect(drawerElement).toBeVisible()
  })

  test.todo('should call onClose')

  test.todo('should call setActiveFilterCount')

  test.todo('should call applyFilters with current filter')

  test.todo('autocompleteInputs should control its chips/options correctly')

  test.todo('toggle all items/imbuements should control filters correctly')

  test.todo('setUrlValues is called with current filters')

  test.todo('onReset, should call applyFilters with current filters')

  test.todo('onMouseOver should display tooltips')
})
