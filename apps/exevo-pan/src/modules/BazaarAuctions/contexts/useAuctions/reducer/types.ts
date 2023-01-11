import { FilterAction } from './filters/types'

export type DefaultAction =
  | {
      type: 'SET_LOADING'
      loading: boolean
    }
  | {
      type: 'SET_MODE'
      mode: AuctionQueryMode
    }
  | {
      type: 'SET_PAGINATION'
      paginationOptions: Partial<PaginationOptions>
    }
  | {
      type: 'SET_SORTING'
      sortingOptions: Partial<SortOptions>
    }
  | {
      type: 'SET_PAGINATED_DATA'
      paginatedData: PaginatedData<CharacterObject>
    }
  | {
      type: 'SYNCH_URL_STATE'
      urlSorting: SortOptions
      urlPagination: PaginationOptions
      urlFilters: FilterOptions
      mode: AuctionQueryMode
    }
  | {
      type: 'HYDRATE_TC_INVESTED'
    }

export type Action = DefaultAction | FilterAction

export interface AuctionsContextState {
  loading: boolean
  mode: AuctionQueryMode
  filterState: FilterOptions
  activeFilterCount: number
  paginationOptions: PaginationOptions
  sortingOptions: SortOptions
  paginatedData: PaginatedData<CharacterObject>
  favoritedState: FavoritedState
  shouldDisplayHighlightedAuctions: boolean
  initialTCInvested: number[]
}

export type Reducer<ActionTypes> = (
  state: AuctionsContextState,
  action: ActionTypes,
) => AuctionsContextState
