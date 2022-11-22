import { AuctionsContextState, Action } from './types'

const AuctionsReducer = (
  state: AuctionsContextState,
  action: Action,
): AuctionsContextState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.loading }

    case 'SET_PAGINATION':
      return {
        ...state,
        paginationOptions: action.paginationOptions,
      }

    case 'SET_SORTING':
      return {
        ...state,
        sortingOptions: action.sortingOptions,
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

export default AuctionsReducer
