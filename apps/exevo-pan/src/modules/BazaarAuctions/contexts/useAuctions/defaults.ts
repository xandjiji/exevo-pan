import {
  DEFAULT_FILTER_OPTIONS,
  DEFAULT_SORT_OPTIONS,
  DEFAULT_PAGINATION_OPTIONS,
} from 'shared-utils/dist/contracts/Filters/defaults'
import { paginationSchema as basePaginationSchema } from 'shared-utils/dist/contracts/Filters/schemas/paginationUrl'
import { AuctionsContextValues } from './types'

export const DEFAULT_STATE: AuctionsContextValues = {
  loading: false,
  isHistory: false,
  highlightedAuctions: [],
  filterState: DEFAULT_FILTER_OPTIONS,
  activeFilterCount: 0,
  paginationOptions: DEFAULT_PAGINATION_OPTIONS,
  sortingOptions: DEFAULT_SORT_OPTIONS.current,
  paginatedData: {
    page: [],
    ...DEFAULT_SORT_OPTIONS.current,
    pageIndex: 0,
    totalItems: 0,
    startOffset: 0,
    endOffset: 0,
    hasNext: false,
    hasPrev: false,
  },
  shouldDisplayHighlightedAuctions: true,
  handlePaginatorFetch: async () => {},
  dispatch: () => {},
}

export const paginationSchema = {
  ...basePaginationSchema,
  pageIndex: {
    ...basePaginationSchema.pageIndex,
    defaultValue: 1,
  },
}
