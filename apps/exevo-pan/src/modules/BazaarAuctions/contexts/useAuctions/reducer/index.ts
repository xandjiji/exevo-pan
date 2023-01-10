import {
  DEFAULT_FILTER_OPTIONS,
  DEFAULT_SORT_OPTIONS,
} from 'shared-utils/dist/contracts/Filters/defaults'
import {
  resetPagination,
  shouldDisplayHighlightedAuctions,
  countActiveFilters,
} from './utils'
import FiltersReducer from './filters'
import { Reducer, Action } from './types'

const ActionsReducer: Reducer<Action> = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.loading }

    case 'SET_MODE': {
      const nextState: ReturnType<typeof ActionsReducer> = {
        ...state,
        mode: action.mode,
      }

      const isHistory = action.mode === 'history'

      nextState.sortingOptions = {
        ...DEFAULT_SORT_OPTIONS,
        descendingOrder: isHistory,
      }

      if (isHistory) {
        nextState.filterState = {
          ...nextState.filterState,
          auctionIds: DEFAULT_FILTER_OPTIONS.auctionIds,
        }
      }

      return nextState
    }

    case 'SET_PAGINATION':
      return {
        ...state,
        paginationOptions: {
          ...state.paginationOptions,
          ...action.paginationOptions,
        },
      }

    case 'SET_SORTING':
      return {
        ...state,
        sortingOptions: { ...state.sortingOptions, ...action.sortingOptions },
      }

    case 'SET_PAGINATED_DATA':
      return shouldDisplayHighlightedAuctions({
        ...state,
        loading: false,
        paginatedData: action.paginatedData,
      })

    case 'SYNCH_URL_STATE':
      return {
        ...state,
        mode: action.mode,
        filterState: action.urlFilters,
        paginationOptions: {
          ...action.urlPagination,
          pageIndex: action.urlPagination.pageIndex - 1,
        },
        sortingOptions: action.urlSorting,
        activeFilterCount: countActiveFilters(
          DEFAULT_FILTER_OPTIONS,
          action.urlFilters,
        ),
      }

    case 'HYDRATE_TC_INVESTED':
      return {
        ...state,
        paginatedData: {
          ...state.paginatedData,
          page: state.paginatedData.page.map((auction, index) => ({
            ...auction,
            tcInvested: state.initialTCInvested[index] ?? 0,
          })),
        },
      }

    default:
      return FiltersReducer(state, action)
  }
}

const resetPaginationActions: Set<Action['type']> = new Set([
  'SET_SORTING',
  'SET_MODE',
])

const ReducerFunction: Reducer<Action> = (state, action) => {
  const nextState = ActionsReducer(state, action)

  if (resetPaginationActions.has(action.type)) resetPagination(nextState)

  return nextState
}

export default ReducerFunction
