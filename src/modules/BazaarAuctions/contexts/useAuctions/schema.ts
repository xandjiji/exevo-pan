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
  sortingMode: 0,
  descendingOrder: false,
  shouldDisplayHighlightedAuctions: true,
  handlePaginatorFetch: async () => {},
  dispatch: () => {},
}

export const buildSchema = (
  orderByDefault: number,
  descendingDefault: boolean,
) => [
  {
    key: 'currentPage',
    defaultValue: 1,
    decode: (value: string) => Number(decodeURIComponent(value)),
  },
  {
    key: 'orderBy',
    defaultValue: orderByDefault,
    decode: (value: string) => Number(decodeURIComponent(value)),
  },
  {
    key: 'descending',
    defaultValue: descendingDefault,
    decode: (value: string) => decodeURIComponent(value) === 'true',
  },
]

export const PAGE_SIZE = 10
