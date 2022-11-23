import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from 'react'
import { filterSchema } from 'shared-utils/dist/contracts/Filters/schemas/filterUrl'
import { sortSchema } from 'shared-utils/dist/contracts/Filters/schemas/sortUrl'
import { paginationSchema } from 'shared-utils/dist/contracts/Filters/schemas/paginationUrl'
import { useTranslations } from 'contexts/useTranslation'
import { useUrlParamsState, useIsMounted } from 'hooks'
import { AuctionsClient } from 'services/client'
import { LoadingAlert } from 'components/Atoms'
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

  const [urlFilters, setUrlFilters, isFiltersDefault] =
    useUrlParamsState(filterSchema)

  const [urlPagination, setUrlPagination, isPaginationDefault] =
    useUrlParamsState({
      ...paginationSchema,
      pageIndex: {
        ...paginationSchema.pageIndex,
        defaultValue: 1,
      },
    })
  const [urlSorting, setUrlSorting, isSortingDefault] = useUrlParamsState(
    sortSchema('current'),
  )

  /* synching state with initial url parameters */
  useEffect(() => {
    /* @ ToDo: isHistory */
    if (!isPaginationDefault || !isSortingDefault || !isFiltersDefault) {
      dispatch({
        type: 'SYNCH_URL_STATE',
        urlFilters,
        urlPagination,
        urlSorting,
      })
    }
  }, [])

  useEffect(() => setUrlFilters(filterState), [filterState])
  useEffect(
    () =>
      setUrlPagination({
        ...paginationOptions,
        pageIndex: paginationOptions.pageIndex + 1,
      }),
    [paginationOptions],
  )
  useEffect(() => setUrlSorting(sortingOptions), [sortingOptions])

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
