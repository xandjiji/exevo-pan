import { useState, useMemo, useCallback, useEffect } from 'react'
import { debounce } from 'utils'
import { useFilters } from '../../contexts/useFilters'
import { ExtractFilterByType } from '../../contexts/useFilters/types'

const DEBOUNCE_DELAY = 250

export type UseDebouncedFilterArgs<Type> = {
  key: ExtractFilterByType<Type>
  controlledValue: Type
}

function useDebouncedFilter<T>({
  key,
  controlledValue,
}: UseDebouncedFilterArgs<T>): [value: T, setValue: (newValue: T) => void] {
  const { setFilters } = useFilters()
  const [value, setValue] = useState<T>(controlledValue)

  const debouncedUpdateFilter = useMemo(
    () =>
      debounce(
        (newValue: T) => setFilters({ [key]: newValue }),
        DEBOUNCE_DELAY,
      ),
    [key, setFilters],
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
