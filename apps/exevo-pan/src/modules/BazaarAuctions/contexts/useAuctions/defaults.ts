import {
  DEFAULT_FILTER_OPTIONS,
  DEFAULT_SORT_OPTIONS,
  DEFAULT_PAGINATION_OPTIONS,
} from 'shared-utils/dist/contracts/Filters/defaults'
import { paginationSchema as basePaginationSchema } from 'shared-utils/dist/contracts/Filters/schemas/paginationUrl'
import { Favorites } from './favorites'
import { AuctionsContextValues } from './types'

export const DEFAULT_STATE: AuctionsContextValues = {
  loading: false,
  initialTCInvested: [],
  mode: 'current',
  highlightedAuctions: [],
  filterState: DEFAULT_FILTER_OPTIONS,
  activeFilterCount: 0,
  paginationOptions: DEFAULT_PAGINATION_OPTIONS,
  sortingOptions: DEFAULT_SORT_OPTIONS,
  paginatedData: {
    page: [],
    ...DEFAULT_SORT_OPTIONS,
    pageIndex: 0,
    totalItems: 0,
    startOffset: 0,
    endOffset: 0,
    hasNext: false,
    hasPrev: false,
  },
  favoritedState: { currentIds: [], historyIds: [], notFoundIds: [] },
  Favorites,
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
