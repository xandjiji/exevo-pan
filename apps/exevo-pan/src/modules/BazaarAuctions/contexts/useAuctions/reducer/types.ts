export type Action =
  | {
      type: 'SET_LOADING'
      loading: boolean
    }
  | {
      type: 'TOGGLE_HISTORY'
      loading: boolean
    }
  | {
      type: 'SET_FILTERS'
      loading: boolean
    }
  | {
      type: 'SET_PAGINATION'
      paginationOptions: PaginationOptions
    }
  | {
      type: 'SET_SORTING'
      sortingOptions: SortOptions
    }
  | {
      type: 'SET_PAGINATED_DATA'
      paginatedData: PaginatedData<CharacterObject>
    }

export interface AuctionsContextState {
  loading: boolean
  isHistory: boolean
  filterState: FilterOptions
  activeFilterCount: number
  paginationOptions: PaginationOptions
  sortingOptions: SortOptions
  paginatedData: PaginatedData<CharacterObject>
  shouldDisplayHighlightedAuctions: boolean
}
