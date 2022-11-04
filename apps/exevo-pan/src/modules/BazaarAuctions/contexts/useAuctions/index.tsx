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
import { AuctionsClient } from 'services'
import { LoadingAlert } from 'components/Atoms'
import AuctionsReducer from './reducer'
import { useFilters } from '../useFilters'
import { DEFAULT_STATE, PAGE_SIZE } from './schema'
import { AuctionsContextValues, AuctionsProviderProps } from './types'

const AuctionsContext = createContext<AuctionsContextValues>(DEFAULT_STATE)

export const AuctionsProvider = ({
  history = false,
  endpoint,
  highlightedAuctions,
  initialPage,
  initialPageData,
  defaultSortingMode,
  defaultDescendingOrder,
  children,
}: AuctionsProviderProps) => {
  const {
    translations: { common },
  } = useTranslations()

  const [pagination, setPagination, isPaginationDefault] =
    useUrlParamsState(paginationSchema)
  const [sorting, setSorting, isSortingDefault] = useUrlParamsState(
    sortSchema(history ? 'history' : 'current'),
  )

  const [state, dispatch] = useReducer(AuctionsReducer, {
    loading: false,
    page: initialPage,
    ...sorting,
    pageData: {
      ...initialPageData,
      pageIndex: pagination.pageIndex - 1,
    },
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
      dispatch({ type: 'SET_LOADING', value: true })

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
        endpoint,
      })

      const isDefaultGridState =
        newPageIndex === 0 &&
        newSortingMode === defaultSortingMode &&
        newDescendingOrder === defaultDescendingOrder
      const noFilterApplied = newFilterCount === 0

      dispatch({
        type: 'STORE_DATA',
        data,
        shouldDisplayHighlightedAuctions: isDefaultGridState && noFilterApplied,
      })
    },
    [endpoint],
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
    dispatch({ type: 'SET_PAGE_INDEX', value: newPageIndex - 1 })
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
