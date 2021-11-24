import { AuctionsContextState, Action } from './types'

const AuctionsReducer = (
  state: AuctionsContextState,
  action: Action,
): AuctionsContextState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true }

    case 'SET_PAGE_INDEX':
      return {
        ...state,
        pageData: { ...state.pageData, pageIndex: action.value },
      }

    case 'SET_SORTING_MODE':
      return {
        ...state,
        sortingMode: action.value,
        pageData: { ...state.pageData, pageIndex: 0 },
      }

    case 'TOGGLE_DESCENDING_ORDER':
      return {
        ...state,
        descendingOrder: !state.descendingOrder,
      }

    case 'STORE_DATA': {
      const { page, sortingMode, descendingOrder, ...pageData } = action.data
      const { shouldDisplayHighlightedAuctions } = action

      return {
        ...state,
        page,
        pageData,
        sortingMode,
        descendingOrder,
        loading: false,
        shouldDisplayHighlightedAuctions,
      }
    }

    default:
      return { ...state }
  }
}

export default AuctionsReducer
