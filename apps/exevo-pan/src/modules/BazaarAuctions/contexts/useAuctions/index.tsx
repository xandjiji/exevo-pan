import {
  createContext,
  useContext,
  useReducer,
  useRef,
  useEffect,
  useCallback,
} from 'react'
import { dequal } from 'dequal'
import { sortSchema } from 'shared-utils/dist/contracts/Filters/schemas/sortUrl'
import { paginationSchema } from 'shared-utils/dist/contracts/Filters/schemas/paginationUrl'
import { useTranslations } from 'contexts/useTranslation'
import { useUrlParamsState, useIsMounted } from 'hooks'
import { AuctionsClient } from 'services/client'
import { LoadingAlert } from 'components/Atoms'
import AuctionsReducer from './reducer'
import { useFilters } from '../useFilters'
import { DEFAULT_STATE, PAGE_SIZE } from './schema'
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

  const [pagination, setPagination, isPaginationDefault] = useUrlParamsState({
    ...paginationSchema,
    pageIndex: {
      ...paginationSchema.pageIndex,
      defaultValue: 1,
    },
  })
  const [sorting, setSorting, isSortingDefault] = useUrlParamsState(
    sortSchema('current'),
  )

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

  const {
    pageData: { pageIndex },
    sortingMode,
    descendingOrder,
  } = state

  const { filterState, activeFilterCount } = useFilters()
  const lastFilterState = useRef(filterState)

  const fetchData = useCallback(
    async (
      newPageIndex: number,
      newSortingMode: number,
      newDescendingOrder: boolean,
      filterOptions: FilterOptions,
      newFilterCount: number,
    ) => {
      dispatch({ type: 'SET_LOADING', loading: true })

      lastFilterState.current = filterOptions
      const paginationOptions = {
        pageIndex: newPageIndex,
        pageSize: PAGE_SIZE,
      }
      const sortOptions = {
        sortingMode: newSortingMode,
        descendingOrder: newDescendingOrder,
      }

      const data = await AuctionsClient.fetchAuctionPage({
        paginationOptions,
        sortOptions,
        filterOptions,
        /* history, */
      })

      const isDefaultGridState =
        newPageIndex === 0 &&
        newSortingMode === defaultSortingMode &&
        newDescendingOrder === defaultDescendingOrder
      const noFilterApplied = newFilterCount === 0

      dispatch({
        type: 'SET_PAGINATED_DATA',
        data,
        shouldDisplayHighlightedAuctions: isDefaultGridState && noFilterApplied,
      })
    },
    [
      /* history */
    ],
  )

  const isMounted = useIsMounted()
  useEffect(() => {
    if (isMounted) {
      const filterChanged = !dequal(filterState, lastFilterState.current)
      fetchData(
        filterChanged ? 0 : pageIndex,
        sortingMode,
        descendingOrder,
        filterState,
        activeFilterCount,
      )
    }
  }, [
    pageIndex,
    sortingMode,
    descendingOrder,
    filterState,
    activeFilterCount,
    fetchData,
  ])

  /* Detecting and fetching new data if there are url parameters */
  useEffect(() => {
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
  )

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
