import { DEFAULT_PAGINATION_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'
import { AuctionsContextState } from './types'

export const resetPagination = (
  state: AuctionsContextState,
): AuctionsContextState => {
  // eslint-disable-next-line no-param-reassign
  state.paginationOptions.pageIndex = DEFAULT_PAGINATION_OPTIONS.pageIndex
  return state
}
