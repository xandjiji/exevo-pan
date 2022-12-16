import { randomDataset } from 'utils/test'
import {
  DEFAULT_FILTER_OPTIONS,
  DEFAULT_PAGINATION_OPTIONS,
  DEFAULT_SORT_OPTIONS,
} from 'shared-utils/dist/contracts/Filters/defaults'
import { AuctionsContextValues } from '../../../contexts/useAuctions/types'
import { PAGE_SIZE } from '..'

const { characterData } = randomDataset()

export const mockedPage = characterData.slice(0, PAGE_SIZE)

export const mockedPaginatedData = {
  page: mockedPage,
  pageIndex: 0,
  totalItems: characterData.length * PAGE_SIZE,
  startOffset: 0,
  endOffset: PAGE_SIZE,
  hasNext: true,
  hasPrev: false,
  descendingOrder: false,
  sortingMode: 0,
}

export const DEFAULT_AUCTIONS_STATE: AuctionsContextValues = {
  isHistory: false,
  loading: false,
  activeFilterCount: 0,
  filterState: DEFAULT_FILTER_OPTIONS,
  initialTCInvested: [],
  paginatedData: mockedPaginatedData,
  handlePaginatorFetch: jest.fn(),
  shouldDisplayHighlightedAuctions: false,
  highlightedAuctions: characterData.slice(20, 22).map((character, index) => ({
    ...character,
    nickname: `highlighted-character-${index}`,
  })),
  paginationOptions: DEFAULT_PAGINATION_OPTIONS,
  sortingOptions: DEFAULT_SORT_OPTIONS,
  dispatch: () => {},
}
