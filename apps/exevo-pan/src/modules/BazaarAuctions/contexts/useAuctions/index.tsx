import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from 'react'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'contexts/useTranslation'
import { useIsMounted } from 'hooks'
import { AuctionsClient } from 'services/client'
import { LoadingAlert } from 'components/Atoms'
import { pluckTCInvested } from 'utils'
import { useSynchUrlState } from './useSynchUrlState'
import AuctionsReducer from './reducer'
import { DEFAULT_STATE } from './defaults'
import { AuctionsContextValues, AuctionsProviderProps } from './types'

const AuctionsContext = createContext<AuctionsContextValues>(DEFAULT_STATE)

export const AuctionsProvider = ({
  highlightedAuctions,
  initialPaginatedData,
  children,
}: AuctionsProviderProps) => {
  const {
    translations: { common },
  } = useTranslations()

  const { data, status } = useSession()

  const [state, dispatch] = useReducer(AuctionsReducer, {
    loading: false,
    isHistory: false,
    filterState: DEFAULT_STATE.filterState,
    activeFilterCount: DEFAULT_STATE.activeFilterCount,
    paginationOptions: DEFAULT_STATE.paginationOptions,
    sortingOptions: {
      descendingOrder: initialPaginatedData.descendingOrder,
      sortingMode: initialPaginatedData.sortingMode,
    },
    paginatedData: {
      ...initialPaginatedData,
      page: initialPaginatedData.page.map(pluckTCInvested),
    },
    shouldDisplayHighlightedAuctions:
      DEFAULT_STATE.shouldDisplayHighlightedAuctions,
    initialTCInvested: initialPaginatedData.page.map(
      ({ tcInvested }) => tcInvested,
    ),
  })

  const { paginationOptions, sortingOptions, filterState, isHistory } = state

  const isMounted = useIsMounted()
  useEffect(() => {
    if (isMounted) {
      dispatch({ type: 'SET_LOADING', loading: true })

      AuctionsClient.fetchAuctionPage({
        paginationOptions,
        sortOptions: sortingOptions,
        filterOptions: filterState,
        history: isHistory,
      }).then((paginatedData) => {
        dispatch({ type: 'SET_PAGINATED_DATA', paginatedData })
      })
    }
  }, [paginationOptions, sortingOptions, filterState, isHistory])

  useSynchUrlState({
    isPro: status === 'loading' ? undefined : data?.user.proStatus ?? false,
    isHistory,
    filterState,
    paginationOptions,
    sortingOptions,
    dispatch,
  })

  const handlePaginatorFetch = useCallback((newPageIndex: number) => {
    dispatch({
      type: 'SET_PAGINATION',
      paginationOptions: { pageIndex: newPageIndex - 1 },
    })
  }, [])

  return (
    <AuctionsContext.Provider
      value={{
        ...state,
        highlightedAuctions,
        handlePaginatorFetch,
        dispatch,
      }}
    >
      {state.loading && <LoadingAlert>{common.LoadingState}</LoadingAlert>}
      {children}
    </AuctionsContext.Provider>
  )
}

export const useAuctions = (): AuctionsContextValues =>
  useContext(AuctionsContext)
