import { useState, useMemo, useCallback } from 'react'
import { debounce } from 'utils'
import { useFetchPosts } from '../../../contexts/useFetchPosts'

const DEBOUNCE_DELAY = 250

function useDebouncedFilter<T>(
  key: keyof BlogFilterOptions,
  initialValue: T,
): [value: T, setValue: (newValue: T) => void] {
  const { dispatchFetchPosts } = useFetchPosts()
  const [value, setValue] = useState<T>(initialValue)

  const debouncedUpdateFilter = useMemo(
    () =>
      debounce(
        (newValue: T) =>
          dispatchFetchPosts({
            type: 'APPLY_FILTERS',
            filterOptions: {
              [key]: newValue,
            },
          }),
        DEBOUNCE_DELAY,
      ),
    [key, dispatchFetchPosts],
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
