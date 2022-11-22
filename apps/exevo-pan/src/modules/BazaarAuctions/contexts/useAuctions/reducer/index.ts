import {
  DEFAULT_FILTER_OPTIONS,
  DEFAULT_SORT_OPTIONS,
  DEFAULT_PAGINATION_OPTIONS,
} from 'shared-utils/dist/contracts/Filters/defaults'
import { AuctionsContextState, Action } from './types'

const AuctionsReducer = (
  state: AuctionsContextState,
  action: Action,
): AuctionsContextState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.loading }

    case 'TOGGLE_HISTORY': {
      const nextState: AuctionsContextState = {
        ...state,
        isHistory: !state.isHistory,
        paginationOptions: { ...state.paginationOptions, pageIndex: 0 },
      }

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
      return {
        ...state,
        sortingOptions: { ...state.sortingOptions, ...action.sortingOptions },
        paginationOptions: { ...state.paginationOptions, pageIndex: 0 },
      }

    case 'SET_PAGINATED_DATA': {
      return {
        ...state,
        loading: false,
        paginatedData: action.paginatedData,
        shouldDisplayHighlightedAuctions: false, // @ ToDo
      }
    }

    default:
      return state
  }
}

/* @ ToDo: active filter count */

export default AuctionsReducer
