import { dequal } from 'dequal'
import {
  DEFAULT_PAGINATION_OPTIONS,
  DEFAULT_SORT_OPTIONS,
} from 'shared-utils/dist/contracts/Filters/defaults'
import { AuctionsContextState } from './types'

export const resetPagination = (
  state: AuctionsContextState,
): AuctionsContextState => {
  // eslint-disable-next-line no-param-reassign
  state.paginationOptions = {
    ...state.paginationOptions,
    pageIndex: DEFAULT_PAGINATION_OPTIONS.pageIndex,
  }
  return state
}

export const shouldDisplayHighlightedAuctions = (
  state: AuctionsContextState,
): AuctionsContextState => {
  const isDefaultGridState =
    state.paginatedData.pageIndex === 0 &&
    state.paginatedData.sortingMode === DEFAULT_SORT_OPTIONS.sortingMode &&
    state.paginatedData.descendingOrder === DEFAULT_SORT_OPTIONS.descendingOrder

  const noFilterApplied = state.activeFilterCount === 0

  // eslint-disable-next-line no-param-reassign
  state.shouldDisplayHighlightedAuctions =
    isDefaultGridState && noFilterApplied && state.mode === 'current'

  return state
}

export const countActiveFilters = (
  defaultFilters: FilterOptions,
  currentFilters: FilterOptions,
): number => {
  let count = 0
  Object.keys(defaultFilters).forEach((filterKey) => {
    const diff = !dequal(
      defaultFilters[filterKey as keyof FilterOptions],
      currentFilters[filterKey as keyof FilterOptions],
    )

    if (diff) count += 1
  })

  return count
}
