import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useRef,
} from 'react'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'contexts/useTranslation'
import { useIsMounted } from 'hooks'
import { AuctionsClient } from 'services/client'
import { LoadingAlert } from 'components/Atoms'
import { pluckTCInvested } from 'utils'
import { useSynchUrlState } from './useSynchUrlState'
import { useFavorites } from './useFavorites'
import AuctionsReducer from './reducer'
import { DEFAULT_STATE } from './defaults'
import { AuctionsContextValues, AuctionsProviderProps } from './types'

const AuctionsContext = createContext<AuctionsContextValues>(DEFAULT_STATE)

export const AuctionsProvider = ({
  highlightedAuctions,
  initialPaginatedData,
  children,
}: AuctionsProviderProps) => {
  const { common } = useTranslations()

  const { data, status } = useSession()

  const [state, dispatch] = useReducer(AuctionsReducer, {
    loading: DEFAULT_STATE.loading,
    mode: DEFAULT_STATE.mode,
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
    favoritedState: DEFAULT_STATE.favoritedState,
    shouldDisplayHighlightedAuctions:
      DEFAULT_STATE.shouldDisplayHighlightedAuctions,
    initialTCInvested: initialPaginatedData.page.map(
      ({ tcInvested }) => tcInvested,
    ),
  })

  const { paginationOptions, sortingOptions, filterState, mode } = state

  const Favorites = useFavorites()
  const favoriteRef = useRef(Favorites.list)
  favoriteRef.current = Favorites.list

  const isMounted = useIsMounted()
  useEffect(() => {
    if (isMounted) {
      dispatch({ type: 'SET_LOADING', loading: true })

      if (mode === 'favorites') {
        AuctionsClient.fetchFavorited({
          ids: favoriteRef.current,
          sortOptions: sortingOptions,
        }).then(({ favoritedState, paginatedData }) => {
          dispatch({
            type: 'SET_FAVORITED_DATA',
            favoritedState,
            paginatedData,
          })
        })
      } else {
        AuctionsClient.fetchAuctionPage({
          paginationOptions,
          sortOptions: sortingOptions,
          filterOptions: filterState,
          history: mode === 'history',
        }).then((paginatedData) => {
          dispatch({ type: 'SET_PAGINATED_DATA', paginatedData })
        })
      }
    }
  }, [paginationOptions, sortingOptions, filterState, mode])

  useSynchUrlState({
    isPro: status === 'loading' ? undefined : data?.user.proStatus ?? false,
    mode,
    filterState: mode === 'favorites' ? DEFAULT_STATE.filterState : filterState,
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
        Favorites,
        dispatch,
      }}
    >
      {state.loading && <LoadingAlert>{common.genericLoading}</LoadingAlert>}
      {children}
    </AuctionsContext.Provider>
  )
}

export const useAuctions = (): AuctionsContextValues =>
  useContext(AuctionsContext)
