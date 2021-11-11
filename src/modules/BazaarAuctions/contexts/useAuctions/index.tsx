import { createContext, useContext, useCallback, useState } from 'react'
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
}

const AuctionsContext = createContext<AuctionsContextValues>(
  DEFAULT_AUCTIONS_STATE,
)

export const AuctionsProvider = ({
  initialPage,
  initialPageData,
  children,
}: AuctionsProviderProps): JSX.Element => {
  /* @ ToDo: refactor this into a reducer once we introduce filters */
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<CharacterObject[]>(initialPage)
  const [pageData, setPageData] = useState<PageData>(initialPageData)

  return (
    <AuctionsContext.Provider value={{ loading, page, pageData }}>
      {children}
    </AuctionsContext.Provider>
  )
}

export const useAuctions = (): AuctionsContextValues =>
  useContext(AuctionsContext)
