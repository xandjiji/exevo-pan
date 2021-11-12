import { createContext, useContext, useReducer, useCallback } from 'react'
import { AuctionsClient } from 'services'
import AuctionsReducer from './reducer'
import { AuctionsContextValues, AuctionsProviderProps } from './types'

const DEFAULT_AUCTIONS_STATE: AuctionsContextValues = {
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

const AuctionsContext = createContext<AuctionsContextValues>(
  DEFAULT_AUCTIONS_STATE,
)

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

  const { sortingMode, descendingOrder } = state

  const handlePaginatorFetch = useCallback(
    async (pageIndex: number) => {
      dispatch({ type: 'SET_LOADING', value: true })
      const data = await AuctionsClient.fetchAuctionPage(
        {
          pageIndex: pageIndex - 1,
        },
        {
          sortingMode,
          descendingOrder,
        },
      )
      dispatch({ type: 'STORE_DATA', data })
    },
    [sortingMode, descendingOrder],
  )

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
