import { useCallback } from 'react'
import { dequal } from 'dequal'
import { DEFAULT_FILTER_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'

export const useNotDefault = (filterState: FilterOptions) =>
  useCallback(
    (filterKey: keyof FilterOptions): boolean =>
      !dequal(filterState[filterKey], DEFAULT_FILTER_OPTIONS[filterKey]),
    [filterState],
  )
