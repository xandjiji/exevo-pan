import { useState, useCallback } from 'react'
import { urlState } from './utils'
import { UseSyncUrlState } from './types'

const useSyncUrlState = <T,>(args: UseSyncUrlState<T>) => {
  const [state, setState] = useState(() => {
    const initialValue = args.value ?? urlState.get(args)

    if (args.value !== undefined) {
      urlState.set(initialValue, args)
    }

    return initialValue
  })

  const setStateAndUpdateParam: typeof setState = useCallback((dispatch) => {
    setState((prev) => {
      const nextState = dispatch instanceof Function ? dispatch(prev) : dispatch
      urlState.set(nextState, args)
      return nextState
    })
  }, [])

  const noState = urlState.isNull(args.key)

  return [state, setStateAndUpdateParam, noState] as const
}

export default useSyncUrlState
