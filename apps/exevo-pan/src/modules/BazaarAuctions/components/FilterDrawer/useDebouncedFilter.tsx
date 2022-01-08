import { useState, useMemo, useCallback } from 'react'
import { debounce } from 'utils'
import { useFilters } from '../../contexts/useFilters'

const DEBOUNCE_DELAY = 250

function useDebouncedFilter<T>(
  key: keyof FilterOptions,
  initialValue: T,
): [value: T, setValue: (newValue: T) => void] {
  const { updateFilters } = useFilters()
  const [value, setValue] = useState<T>(initialValue)

  const debouncedUpdateFilter = useMemo(
    () =>
      debounce((newValue: T) => updateFilters(key, newValue), DEBOUNCE_DELAY),
    [key, updateFilters],
  )

  const setValueAndDispatch = useCallback(
    (newValue: T) => {
      setValue(newValue)
      debouncedUpdateFilter(newValue)
    },
    [debouncedUpdateFilter],
  )

  return [value, setValueAndDispatch]
}

export default useDebouncedFilter
