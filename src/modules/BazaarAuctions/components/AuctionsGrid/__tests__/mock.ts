import { randomDataset } from 'utils/test'
import { AuctionsContextValues } from '../../../contexts/useAuctions/types'
import { FiltersContextValues } from '../../../contexts/useFilters/types'
import { DEFAULT_FILTER_STATE } from '../../../../../services/Auctions/defaults'
import { PAGE_SIZE } from '..'

const { characterData } = randomDataset()

export const mockedPage = characterData.slice(0, PAGE_SIZE)

export const mockedPageData = {
  pageIndex: 0,
  totalItems: characterData.length * PAGE_SIZE,
  startOffset: 0,
  endOffset: PAGE_SIZE,
  hasNext: true,
  hasPrev: false,
}

export const DEFAULT_AUCTIONS_STATE: AuctionsContextValues = {
  loading: false,
  page: mockedPage,
  pageData: mockedPageData,
  handlePaginatorFetch: jest.fn(),
  shouldDisplayHighlightedAuctions: false,
  highlightedAuctions: characterData.slice(0, 2).map((character, index) => ({
    ...character,
    nickname: `highlighted-character-${index}`,
  })),
  descendingOrder: false,
  sortingMode: 0,
  dispatch: () => {},
}

export const DEFAULT_FILTERS_STATE: FiltersContextValues = {
  activeFilterCount: 0,
  defaultValues: DEFAULT_FILTER_STATE,
  filterState: DEFAULT_FILTER_STATE,
  toggleAllOptions: () => {},
  updateFilters: () => {},
  dispatch: () => {},
}
