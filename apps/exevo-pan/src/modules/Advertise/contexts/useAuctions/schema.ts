import { DEFAULT_PAGINATION_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'
import { AuctionsContextValues } from './types'

export const DEFAULT_STATE: AuctionsContextValues = {
  loading: false,
  nickname: '',
  page: [],
  pageData: {
    pageIndex: 0,
    totalItems: 0,
    startOffset: 0,
    endOffset: 0,
    hasNext: false,
    hasPrev: false,
  },
  handlePaginatorFetch: async () => {},
  handleNicknameFetch: async () => {},
}

export const PAGE_SIZE = DEFAULT_PAGINATION_OPTIONS.pageSize
