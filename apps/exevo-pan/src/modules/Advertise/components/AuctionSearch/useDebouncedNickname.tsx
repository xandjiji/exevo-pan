import { useState, useMemo, useCallback } from 'react'
import { debounce } from 'utils'
import { useAuctions } from '../../contexts/useAuctions'

const DEBOUNCE_DELAY = 250

const useDebouncedNickname = (): [
  value: string,
  setValue: (newValue: string) => void,
] => {
  const { nickname, handleNicknameFetch } = useAuctions()
  const [value, setValue] = useState(nickname)

  const debouncedFetch = useMemo(
    () =>
      debounce(
        (newNickname: string) => handleNicknameFetch(newNickname),
        DEBOUNCE_DELAY,
      ),
    [handleNicknameFetch],
  )

  const setValueAndDispatch = useCallback(
    (newValue: string) => {
      setValue(newValue)
      debouncedFetch(newValue)
    },
    [debouncedFetch],
  )

  return [value, setValueAndDispatch]
}

export default useDebouncedNickname
