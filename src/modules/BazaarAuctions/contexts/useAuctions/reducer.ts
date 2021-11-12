import { AuctionsContextState, Action } from './types'

const AuctionsReducer = (
  state: AuctionsContextState,
  action: Action,
): AuctionsContextState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.value }

    case 'SET_PAGE_INDEX':
      return {
        ...state,
        pageData: { ...state.pageData, pageIndex: action.value },
      }

    case 'STORE_DATA': {
      const { page, ...pageData } = action.data
      return {
        ...state,
        page,
        pageData,
        loading: false,
      }
    }

    default:
      return { ...state }
  }
}

export default AuctionsReducer
