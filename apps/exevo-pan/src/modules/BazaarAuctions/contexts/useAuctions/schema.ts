import {
  DEFAULT_SORT_OPTIONS,
  DEFAULT_PAGINATION_OPTIONS,
} from 'shared-utils/dist/contracts/Filters/defaults'
import { AuctionsContextValues } from './types'

export { buildSchema } from 'shared-utils/dist/contracts/Filters/schemas/sortUrl'

export const DEFAULT_STATE: AuctionsContextValues = {
  loading: false,
  highlightedAuctions: [],
  page: [],
  pageData: {
    pageIndex: 0,
    totalItems: 0,
    startOffset: 0,
    endOffset: 0,
    hasNext: false,
    hasPrev: false,
  },
  sortingMode: DEFAULT_SORT_OPTIONS.sortingMode,
  descendingOrder: DEFAULT_SORT_OPTIONS.descendingOrder,
  shouldDisplayHighlightedAuctions: true,
  handlePaginatorFetch: async () => {},
  dispatch: () => {},
}

export const PAGE_SIZE = DEFAULT_PAGINATION_OPTIONS.pageSize
