import {
  createContext,
  useContext,
  useReducer,
  useRef,
  useEffect,
  useCallback,
} from 'react'
import { dequal } from 'dequal'
import { urlParametersState } from 'utils'
import { useIsMounted } from 'hooks'
import { AuctionsClient } from 'services'
import AuctionsReducer from './reducer'
import { useFilters } from '../useFilters'
import { DEFAULT_STATE, buildSchema, PAGE_SIZE } from './schema'
import { AuctionsContextValues, AuctionsProviderProps } from './types'

const AuctionsContext = createContext<AuctionsContextValues>(DEFAULT_STATE)

export const AuctionsProvider = ({
  endpoint,
  highlightedAuctions,
  initialPage,
  initialPageData,
  defaultSortingMode,
  defaultDescendingOrder,
  children,
}: AuctionsProviderProps): JSX.Element => {
  const {
    current: { isCurrentlyDefaultValues, getUrlValues, setUrlValues },
  } = useRef(
    urlParametersState(buildSchema(defaultSortingMode, defaultDescendingOrder)),
  )
  const initialUrlState = useRef(getUrlValues())

  const [state, dispatch] = useReducer(AuctionsReducer, {
    loading: false,
    page: initialPage,
    pageData: {
      ...initialPageData,
      pageIndex: initialUrlState.current.currentPage - 1,
    },
    sortingMode: initialUrlState.current.orderBy,
    descendingOrder: initialUrlState.current.descending,
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
      dispatch({ type: 'SET_LOADING' })

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
      if (!isCurrentlyDefaultValues() || activeFilterCount > 0) {
        const { currentPage, orderBy, descending } = initialUrlState.current
        fetchData(
          currentPage - 1,
          orderBy,
          descending,
          filterState,
          activeFilterCount,
        )
      }
    }
  }, [])

  useEffect(
    () =>
      setUrlValues({
        currentPage: pageIndex + 1,
        descending: descendingOrder,
        orderBy: sortingMode,
      }),
    [pageIndex, descendingOrder, sortingMode],
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
      {children}
    </AuctionsContext.Provider>
  )
}

export const useAuctions = (): AuctionsContextValues =>
  useContext(AuctionsContext)
