import { useState, useMemo, useCallback, useEffect } from 'react'
import { debounce } from 'utils'
import { useFilters } from '../../contexts/useFilters'

const DEBOUNCE_DELAY = 250

function useDebouncedFilter<T>(
  key: keyof FilterOptions,
  controlledValue: T,
): [value: T, setValue: (newValue: T) => void] {
  const { updateFilters } = useFilters()
  const [value, setValue] = useState<T>(controlledValue)

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

  useEffect(() => {
    setValue(controlledValue)
  }, [controlledValue])

  return [value, setValueAndDispatch]
}

export default useDebouncedFilter
