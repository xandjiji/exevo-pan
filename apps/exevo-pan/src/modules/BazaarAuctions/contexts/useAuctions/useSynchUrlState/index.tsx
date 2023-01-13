import { useEffect, useMemo } from 'react'
import { filterSchema } from 'shared-utils/dist/contracts/Filters/schemas/filterUrl'
import { sortSchema } from 'shared-utils/dist/contracts/Filters/schemas/sortUrl'
import { pluckPremiumFilters } from 'utils'
import useSynchUrlParamsState from './useSynchUrlParamsState'
import { paginationSchema } from '../defaults'
import { UseSynchcUrlStateProps } from './types'

const DEFAULT_MODE: AuctionQueryMode = 'current'

export const useSynchUrlState = ({
  isPro,
  mode: modeProp,
  filterState,
  paginationOptions,
  sortingOptions,
  dispatch,
}: UseSynchcUrlStateProps) => {
  const [{ mode }, isHistoryDefault] = useSynchUrlParamsState({
    schemaCodec: {
      mode: {
        defaultValue: DEFAULT_MODE,
        urlKey: 'mode',
      },
    },
    currentState: useMemo(() => ({ mode: modeProp }), [modeProp]),
  })
  const [urlFilters, isFiltersDefault] = useSynchUrlParamsState({
    schemaCodec: filterSchema,
    currentState: filterState,
  })
  const [urlPagination, isPaginationDefault] = useSynchUrlParamsState({
    schemaCodec: paginationSchema,
    currentState: useMemo(
      () => ({
        ...paginationOptions,
        pageIndex: paginationOptions.pageIndex + 1,
      }),
      [paginationOptions],
    ),
  })
  const [urlSorting, isSortingDefault] = useSynchUrlParamsState({
    schemaCodec: sortSchema,
    currentState: sortingOptions,
  })

  /* synching state with initial url parameters */
  useEffect(() => {
    if (isPro === undefined) return

    if (
      !isHistoryDefault ||
      !isPaginationDefault ||
      !isSortingDefault ||
      !isFiltersDefault
    ) {
      dispatch({
        type: 'SYNCH_URL_STATE',
        urlFilters: isPro ? urlFilters : pluckPremiumFilters(urlFilters),
        urlPagination,
        urlSorting,
        mode,
      })
    } else if (isPro) {
      dispatch({ type: 'HYDRATE_TC_INVESTED' })
    }
  }, [isPro])
}
