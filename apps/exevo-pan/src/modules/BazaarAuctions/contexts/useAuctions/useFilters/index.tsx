import { useState, useCallback, useMemo } from 'react'
import { DEFAULT_FILTER_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'
/* import { useUrlParamsState } from 'hooks' */
/* import { filterSchema } from 'shared-utils/dist/contracts/Filters/schemas/filterUrl' */
import { countActiveFilters, toggleSet } from './utils'
import { UseFiltersValues } from './types'

const useFilters = (): UseFiltersValues => {
  /* const [filterState, setFilterState] = useUrlParamsState(filterSchema) */
  const [filterState, setFilterState] = useState(DEFAULT_FILTER_OPTIONS)

  return {
    filterState,
    defaultValues: DEFAULT_FILTER_OPTIONS,
    activeFilterCount: useMemo(
      () => countActiveFilters(filterState, DEFAULT_FILTER_OPTIONS),
      [filterState],
    ),
    setFilters: useCallback(
      (newValues) =>
        setFilterState((currentValues) => ({
          ...currentValues,
          ...newValues,
        })),
      [],
    ),
    toggleFilterSet: useCallback(
      ({ key, value }) =>
        setFilterState((currentValues) => ({
          ...currentValues,
          [key]: toggleSet(currentValues[key], value),
        })),
      [],
    ),
    toggleAllFilterSetOptions: useCallback(
      (key, allOptions) =>
        setFilterState((currentValues) => ({
          ...currentValues,
          [key]:
            currentValues[key].size === allOptions.length
              ? new Set([])
              : new Set(allOptions.map(({ value }) => value)),
        })),
      [],
    ),
    toggleAddon: useCallback(
      (value) =>
        setFilterState((currentValues) => {
          const currentAddon = currentValues.addon
          return {
            ...currentValues,
            addon:
              currentAddon === 3 || currentAddon === value
                ? currentAddon - value
                : currentAddon + value,
          }
        }),
      [],
    ),
    resetFilters: useCallback(
      () => setFilterState({ ...DEFAULT_FILTER_OPTIONS }),
      [],
    ),
  }
}

export default useFilters
