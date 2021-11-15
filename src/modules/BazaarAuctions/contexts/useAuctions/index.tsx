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
import { buildSchema } from './schema'
import { AuctionsContextValues, AuctionsProviderProps } from './types'

const DEFAULT_STATE: AuctionsContextValues = {
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

const AuctionsContext = createContext<AuctionsContextValues>(DEFAULT_STATE)

/* @ ToDo: change 'initial' to 'default' */
export const AuctionsProvider = ({
  initialPage,
  initialPageData,
  initialSortingMode,
  initialDescendingOrder,
  children,
}: AuctionsProviderProps): JSX.Element => {
  const {
    current: { isCurrentlyDefaultValues, getUrlValues, setUrlValues },
  } = useRef(
    urlParametersState(buildSchema(initialSortingMode, initialDescendingOrder)),
  )

  const [state, dispatch] = useReducer(AuctionsReducer, {
    loading: true,
    page: initialPage,
    pageData: initialPageData,
    sortingMode: initialSortingMode,
    descendingOrder: initialDescendingOrder,
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
        filterChanged ? 0 : pageIndex,
        sortingMode,
        descendingOrder,
        filterState,
      )
    }
  }, [pageIndex, sortingMode, descendingOrder, filterState, fetchData])

  /* Detecting and fetching new data if there are url parameters */
  useEffect(() => {
    if (!isMounted) {
      if (!isCurrentlyDefaultValues() || activeFilterCount > 0) {
        const { currentPage, orderBy, descending } = getUrlValues()
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
    dispatch({ type: 'SET_PAGE_INDEX', value: newPageIndex - 1 })
  }, [])

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
