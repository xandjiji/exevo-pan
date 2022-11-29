import { FilterAction } from './filters/types'

export type DefaultAction =
  | {
      type: 'SET_LOADING'
      loading: boolean
    }
  | {
      type: 'TOGGLE_HISTORY'
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
      urlHistory: boolean
    }
  | {
      type: 'HYDRATE_TC_INVESTED'
    }

export type Action = DefaultAction | FilterAction

export interface AuctionsContextState {
  loading: boolean
  isHistory: boolean
  filterState: FilterOptions
  activeFilterCount: number
  paginationOptions: PaginationOptions
  sortingOptions: SortOptions
  paginatedData: PaginatedData<CharacterObject>
  shouldDisplayHighlightedAuctions: boolean
  initialTCInvested: number[]
}

export type Reducer<ActionTypes> = (
  state: AuctionsContextState,
  action: ActionTypes,
) => AuctionsContextState
