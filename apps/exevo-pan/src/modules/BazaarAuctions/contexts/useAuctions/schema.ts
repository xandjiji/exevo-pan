import {
  DEFAULT_SORT_OPTIONS,
  DEFAULT_PAGINATION_OPTIONS,
} from 'shared-utils/dist/contracts/Filters/defaults'
import { AuctionsContextValues } from './types'

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
  ...DEFAULT_SORT_OPTIONS.current,
  shouldDisplayHighlightedAuctions: true,
  handlePaginatorFetch: async () => {},
  dispatch: () => {},
}

export const PAGE_SIZE = DEFAULT_PAGINATION_OPTIONS.pageSize
