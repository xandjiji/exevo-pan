export type Action =
  | {
      type: 'SET_LOADING'
    }
  | {
      type: 'SET_PAGE_INDEX'
      value: number
    }
  | {
      type: 'SET_SORTING_MODE'
      value: number
    }
  | {
      type: 'TOGGLE_DESCENDING_ORDER'
    }
  | {
      type: 'STORE_DATA'
      data: PaginatedData<CharacterObject>
      shouldDisplayHighlightedAuctions: boolean
    }

export interface AuctionsContextState {
  loading: boolean
  page: CharacterObject[]
  pageData: PageData
  sortingMode: number
  descendingOrder: boolean
  shouldDisplayHighlightedAuctions: boolean
}

export interface AuctionsContextValues extends AuctionsContextState {
  highlightedAuctions: CharacterObject[]
  handlePaginatorFetch: (pageIndex: number) => void
  dispatch: React.Dispatch<Action>
}

export interface AuctionsProviderProps {
  endpoint: string
  highlightedAuctions: CharacterObject[]
  initialPage: CharacterObject[]
  initialPageData: PageData
  defaultSortingMode: number
  defaultDescendingOrder: boolean
  children: React.ReactNode
}
