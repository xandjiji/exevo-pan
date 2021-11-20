export type Action =
  | {
      type: 'SET_LOADING'
      value: boolean
    }
  | {
      type: 'SET_LOCAL_INDEX'
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
    }

export interface AuctionsContextState {
  loading: boolean
  localIndex: number
  page: CharacterObject[]
  pageData: PageData
  sortingMode: number
  descendingOrder: boolean
}

export interface AuctionsContextValues extends AuctionsContextState {
  highlightedAuctions: CharacterObject[]
  handlePaginatorFetch: (pageIndex: number) => void
  dispatch: React.Dispatch<Action>
}

export interface AuctionsProviderProps {
  highlightedAuctions: CharacterObject[]
  initialPage: CharacterObject[]
  initialPageData: PageData
  defaultSortingMode: number
  defaultDescendingOrder: boolean
  children: React.ReactNode
}
