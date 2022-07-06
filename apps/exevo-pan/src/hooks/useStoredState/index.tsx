import { useCallback, useRef, useState } from 'react'
import { getFromLocalStorage, saveToLocalStorage } from 'utils'

const useStoredState = <T,>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() =>
    getFromLocalStorage(key, initialValue),
  )

  const setValueRef = useRef<React.Dispatch<React.SetStateAction<T>>>()

  setValueRef.current = (value) => {
    const newValue = value instanceof Function ? value(storedValue) : value
    saveToLocalStorage(key, newValue)
    setStoredValue(newValue)
  }

  const setValue: typeof setValueRef.current = useCallback(
    (value) => setValueRef.current?.(value),
    [],
  )

  return [storedValue, setValue]
}

export default useStoredState
