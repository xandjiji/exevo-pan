import {
  DEFAULT_FILTER_OPTIONS,
  DEFAULT_SORT_OPTIONS,
} from 'shared-utils/dist/contracts/Filters/defaults'
import { resetPagination } from './utils'
import FiltersReducer from './filters'
import { Reducer } from './types'

const AuctionsReducer: Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.loading }

    case 'TOGGLE_HISTORY': {
      const nextState: ReturnType<Reducer> = resetPagination({
        ...state,
        isHistory: !state.isHistory,
      })

      nextState.sortingOptions =
        DEFAULT_SORT_OPTIONS[nextState.isHistory ? 'history' : 'current']

      if (nextState.isHistory) {
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
      return resetPagination({
        ...state,
        sortingOptions: { ...state.sortingOptions, ...action.sortingOptions },
      })

    case 'SET_PAGINATED_DATA':
      return {
        ...state,
        loading: false,
        paginatedData: action.paginatedData,
        shouldDisplayHighlightedAuctions: false, // @ ToDo
      }

    default:
      return FiltersReducer(state, action)
  }
}

export default AuctionsReducer
