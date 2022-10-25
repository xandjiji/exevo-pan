import {
  DEFAULT_SORT_OPTIONS,
  DEFAULT_PAGINATION_OPTIONS,
} from 'shared-utils/dist/contracts/Filters/defaults'
import { SchemaCodec, codecs } from 'hooks/useUrlParamsState'
import { AuctionsContextValues } from './types'

const pagination: SchemaCodec<PaginationOptions> = {
  pageIndex: {
    urlKey: 'currentPage',
    defaultValue: 1,
    decode: codecs.decode.Number,
  },
  pageSize: {
    urlKey: 'pageSize',
    defaultValue: 10,
    decode: codecs.decode.Number,
  },
}

export const schema = {
  buildSortingSchema: (defaults: SortOptions): SchemaCodec<SortOptions> => ({
    sortingMode: {
      urlKey: 'orderBy',
      defaultValue: defaults.sortingMode,
      decode: codecs.decode.Number,
    },
    descendingOrder: {
      urlKey: 'descending',
      defaultValue: defaults.descendingOrder,
      decode: codecs.decode.Boolean,
    },
  }),
  pagination,
}

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
