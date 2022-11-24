import { useEffect, useMemo } from 'react'
import { filterSchema } from 'shared-utils/dist/contracts/Filters/schemas/filterUrl'
import { sortSchema } from 'shared-utils/dist/contracts/Filters/schemas/sortUrl'
import useSynchUrlParamsState from './useSynchUrlParamsState'
import { paginationSchema } from '../defaults'
import { UseSynchcUrlStateProps } from './types'

export const useSynchUrlState = ({
  filterState,
  paginationOptions,
  sortingOptions,
  dispatch,
}: UseSynchcUrlStateProps) => {
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
    schemaCodec: sortSchema('current'),
    currentState: sortingOptions,
  })

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
}
