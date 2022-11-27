import { useState, useMemo, useCallback, useEffect } from 'react'
import { debounce } from 'utils'
import { useAuctions } from '../../contexts/useAuctions'
import { ExtractFilterByType } from '../../contexts/useAuctions/reducer/filters/types'

const DEBOUNCE_DELAY = 1000

export type UseDebouncedFilterArgs<Type> = {
  key: ExtractFilterByType<Type>
  controlledValue: Type
}

function useDebouncedFilter<T>({
  key,
  controlledValue,
}: UseDebouncedFilterArgs<T>): [value: T, setValue: (newValue: T) => void] {
  const { dispatch } = useAuctions()
  const [value, setValue] = useState<T>(controlledValue)

  const debouncedUpdateFilter = useMemo(
    () =>
      debounce(
        (newValue: T) =>
          dispatch({ type: 'SET_FILTERS', filterOptions: { [key]: newValue } }),
        DEBOUNCE_DELAY,
      ),
    [key],
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
