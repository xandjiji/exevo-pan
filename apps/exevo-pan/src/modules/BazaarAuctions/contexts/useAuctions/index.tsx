import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from 'react'
import { sortSchema } from 'shared-utils/dist/contracts/Filters/schemas/sortUrl'
import { paginationSchema } from 'shared-utils/dist/contracts/Filters/schemas/paginationUrl'
import { useTranslations } from 'contexts/useTranslation'
import { useUrlParamsState, useIsMounted } from 'hooks'
import { AuctionsClient } from 'services/client'
import { LoadingAlert } from 'components/Atoms'
import AuctionsReducer from './reducer'
import { DEFAULT_STATE, PAGE_SIZE } from './schema'
import { AuctionsContextValues, AuctionsProviderProps } from './types'

const AuctionsContext = createContext<AuctionsContextValues>(DEFAULT_STATE)

/* @ ToDo: handle url params */

export const AuctionsProvider = ({
  highlightedAuctions,
  initialPaginatedData,
  children,
}: AuctionsProviderProps) => {
  const {
    translations: { common },
  } = useTranslations()

  /* const [pagination, setPagination, isPaginationDefault] = useUrlParamsState({
    ...paginationSchema,
    pageIndex: {
      ...paginationSchema.pageIndex,
      defaultValue: 1,
    },
  })
  const [sorting, setSorting, isSortingDefault] = useUrlParamsState(
    sortSchema('current'),
  ) */

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
    paginatedData: initialPaginatedData,
    shouldDisplayHighlightedAuctions:
      DEFAULT_STATE.shouldDisplayHighlightedAuctions,
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

  /* Detecting and fetching new data if there are url parameters */
  /* useEffect(() => {
    if (!isMounted) {
      if (!isPaginationDefault || !isSortingDefault || activeFilterCount > 0) {
        fetchData(
          pagination.pageIndex - 1,
          sorting.sortingMode,
          sorting.descendingOrder,
          filterState,
          activeFilterCount,
        )
      }
    }
  }, [])

  useEffect(
    () => setPagination({ pageIndex: pageIndex + 1, pageSize: PAGE_SIZE }),
    [pageIndex],
  )
  useEffect(
    () => setSorting({ sortingMode, descendingOrder }),
    [sortingMode, descendingOrder],
  ) */

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
