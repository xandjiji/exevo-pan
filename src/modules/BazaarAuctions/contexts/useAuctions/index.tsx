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
  handlePaginatorFetch: async () => {},
  dispatch: () => {},
}

const AuctionsContext = createContext<AuctionsContextValues>(
  DEFAULT_AUCTIONS_STATE,
)

export const AuctionsProvider = ({
  initialPage,
  initialPageData,
  children,
}: AuctionsProviderProps): JSX.Element => {
  const [{ loading, page, pageData }, dispatch] = useReducer(AuctionsReducer, {
    loading: true,
    page: initialPage,
    pageData: initialPageData,
  })

  const handlePaginatorFetch = useCallback(async (pageIndex: number) => {
    dispatch({ type: 'SET_LOADING', value: true })
    const data = await AuctionsClient.fetchAuctionPage({
      pageIndex: pageIndex - 1,
    })
    dispatch({ type: 'STORE_DATA', data })
  }, [])

  return (
    <AuctionsContext.Provider
      value={{ loading, page, pageData, handlePaginatorFetch, dispatch }}
    >
      {children}
    </AuctionsContext.Provider>
  )
}

export const useAuctions = (): AuctionsContextValues =>
  useContext(AuctionsContext)
