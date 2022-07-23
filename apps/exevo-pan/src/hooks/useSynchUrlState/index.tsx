import { useRef, useCallback } from 'react'
import { urlState } from './utils'
import { RegisteredParameter } from './types'

const useSynchUrlState = <T,>(args: RegisteredParameter<T>) => {
  const valueRef = useRef(urlState.get(args))

  const subscribe = useCallback((newValue: T) => {
    if (newValue !== valueRef.current) urlState.set(newValue, args)
    valueRef.current = newValue
  }, [])

  return { initialValue: valueRef.current, subscribe }
}

export default useSynchUrlState
