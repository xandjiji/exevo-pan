import {
  createContext,
  useContext,
  useReducer,
  useRef,
  useEffect,
  useCallback,
} from 'react'
import { AuctionsClient } from 'services'
import AuctionsReducer from './reducer'
import { AuctionsContextValues, AuctionsProviderProps } from './types'

const DEFAULT_STATE: AuctionsContextValues = {
  loading: false,
  page: [],
  pageData: {
    pageIndex: 0,
    totalItems: 0,
    startOffset: 0,
    endOffset: 0,
    hasNext: false,
    hasPrev: false,
  },
  sortingMode: 0,
  descendingOrder: false,
  handlePaginatorFetch: async () => {},
  dispatch: () => {},
}

const AuctionsContext = createContext<AuctionsContextValues>(DEFAULT_STATE)

export const AuctionsProvider = ({
  initialPage,
  initialPageData,
  initialSortingMode,
  initialDescendingOrder,
  children,
}: AuctionsProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(AuctionsReducer, {
    loading: true,
    page: initialPage,
    pageData: initialPageData,
    sortingMode: initialSortingMode,
    descendingOrder: initialDescendingOrder,
  })

  const {
    pageData: { pageIndex },
    sortingMode,
    descendingOrder,
  } = state

  const isMounted = useRef(false)
  useEffect(() => {
    if (isMounted.current) {
      ;(async () => {
        dispatch({ type: 'SET_LOADING', value: true })
        const data = await AuctionsClient.fetchAuctionPage(
          {
            pageIndex,
          },
          {
            sortingMode,
            descendingOrder,
          },
        )
        dispatch({ type: 'STORE_DATA', data })
      })()
    } else {
      isMounted.current = true
    }
  }, [pageIndex, sortingMode, descendingOrder])

  const handlePaginatorFetch = useCallback((newPageIndex: number) => {
    dispatch({ type: 'SET_PAGE_INDEX', value: newPageIndex - 1 })
  }, [])

  return (
    <AuctionsContext.Provider
      value={{
        ...state,
        handlePaginatorFetch,
        dispatch,
      }}
    >
      {children}
    </AuctionsContext.Provider>
  )
}

export const useAuctions = (): AuctionsContextValues =>
  useContext(AuctionsContext)
