import { useRef, useCallback } from 'react'
import { urlState } from './utils'
import { RegisteredParameter } from './types'

const useSynchUrlState = <T,>(args: RegisteredParameter<T>) => {
  const valueRef = useRef(urlState.get(args))

  const subscribe = useCallback((newValue: T) => {
    urlState.set(newValue, args)
    valueRef.current = newValue
  }, [])

  const isDefault = valueRef.current === args.defaultValue

  return {
    initialValue: valueRef.current,
    subscribe,
    isDefault,
  }
}

export default useSynchUrlState
