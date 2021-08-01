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

  test('should call onClose', () => {
    renderWithProviders(<FilterDrawer {...defaultArgs} />)

    expect(mockOnClose).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByLabelText('Close drawer'))
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  test('should call setActiveFilterCount', () => {
    renderWithProviders(<FilterDrawer {...defaultArgs} />)

    expect(mockSetActiveFilterCount).toHaveBeenCalledTimes(1)
    expect(mockSetActiveFilterCount).toHaveBeenLastCalledWith(0)

    userEvent.click(screen.getByAltText('Knight'))
    expect(mockSetActiveFilterCount).toHaveBeenCalledTimes(2)
    expect(mockSetActiveFilterCount).toHaveBeenLastCalledWith(1)

    userEvent.click(screen.getByAltText('Druid'))
    expect(mockSetActiveFilterCount).toHaveBeenCalledTimes(3)
    expect(mockSetActiveFilterCount).toHaveBeenLastCalledWith(1)

    userEvent.type(screen.getByLabelText('Search nickname'), 'K')
    expect(mockSetActiveFilterCount).toHaveBeenCalledTimes(4)
    expect(mockSetActiveFilterCount).toHaveBeenLastCalledWith(2)

    userEvent.click(screen.getByText('Rare nicknames'))
    expect(mockSetActiveFilterCount).toHaveBeenCalledTimes(5)
    expect(mockSetActiveFilterCount).toHaveBeenLastCalledWith(3)

    userEvent.click(screen.getByText('Rare nicknames'))
    expect(mockSetActiveFilterCount).toHaveBeenCalledTimes(6)
    expect(mockSetActiveFilterCount).toHaveBeenLastCalledWith(2)

    userEvent.click(screen.getByAltText('Knight'))
    expect(mockSetActiveFilterCount).toHaveBeenCalledTimes(7)
    expect(mockSetActiveFilterCount).toHaveBeenLastCalledWith(2)

    userEvent.click(screen.getByAltText('Druid'))
    expect(mockSetActiveFilterCount).toHaveBeenCalledTimes(8)
    expect(mockSetActiveFilterCount).toHaveBeenLastCalledWith(1)
  })

  test.todo('should call applyFilters with current filter')

  test.todo('autocompleteInputs should control its chips/options correctly')

  test.todo('toggle all items/imbuements should control filters correctly')

  test.todo('setUrlValues is called with current filters')

  test.todo('onReset, should call applyFilters with current filters')

  test.todo('onMouseOver should display tooltips')
})
