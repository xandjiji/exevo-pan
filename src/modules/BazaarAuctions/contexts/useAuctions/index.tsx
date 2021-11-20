import {
  createContext,
  useContext,
  useReducer,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { dequal } from 'dequal'
import { urlParametersState } from 'utils'
import { useIsMounted } from 'hooks'
import { AuctionsClient } from 'services'
import AuctionsReducer from './reducer'
import { useFilters } from '../useFilters'
import { DEFAULT_STATE, buildSchema } from './schema'
import { AuctionsContextValues, AuctionsProviderProps } from './types'

const AuctionsContext = createContext<AuctionsContextValues>(DEFAULT_STATE)

export const AuctionsProvider = ({
  highlightedAuctions: highlightedAuctionsData,
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
    localIndex: initialUrlState.current.currentPage - 1,
    page: initialPage,
    pageData: {
      ...initialPageData,
      pageIndex: initialUrlState.current.currentPage - 1,
    },
    sortingMode: initialUrlState.current.orderBy,
    descendingOrder: initialUrlState.current.descending,
  })

  const {
    localIndex,
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
      filterOptions: FilterState,
    ) => {
      dispatch({ type: 'SET_LOADING', value: true })

      lastFilterState.current = filterOptions
      const paginationOptions = {
        pageIndex: newPageIndex,
        pageSize: 10,
      }
      const sortOptions = {
        sortingMode: newSortingMode,
        descendingOrder: newDescendingOrder,
      }

      const data = await AuctionsClient.fetchAuctionPage({
        paginationOptions,
        sortOptions,
        filterOptions,
      })
      dispatch({ type: 'STORE_DATA', data })
    },
    [],
  )

  const isMounted = useIsMounted()
  useEffect(() => {
    if (isMounted) {
      const filterChanged = !dequal(filterState, lastFilterState.current)
      fetchData(
        filterChanged ? 0 : localIndex,
        sortingMode,
        descendingOrder,
        filterState,
      )
    }
  }, [localIndex, sortingMode, descendingOrder, filterState, fetchData])

  /* Detecting and fetching new data if there are url parameters */
  useEffect(() => {
    if (!isMounted) {
      if (!isCurrentlyDefaultValues() || activeFilterCount > 0) {
        const { currentPage, orderBy, descending } = initialUrlState.current
        fetchData(currentPage - 1, orderBy, descending, filterState)
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
    dispatch({ type: 'SET_LOCAL_INDEX', value: newPageIndex - 1 })
  }, [])

  const highlightedAuctions = useMemo(() => {
    const isDefaultGridState =
      pageIndex === 0 &&
      sortingMode === defaultSortingMode &&
      descendingOrder === defaultDescendingOrder
    const noFilterApplied = activeFilterCount === 0

    const shouldDisplayHighlightedAuctions =
      isDefaultGridState && noFilterApplied

    return shouldDisplayHighlightedAuctions ? highlightedAuctionsData : []
  }, [
    highlightedAuctionsData,
    pageIndex,
    sortingMode,
    descendingOrder,
    activeFilterCount,
  ])

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
