import { useState, useCallback, useEffect } from 'react'
import useStoredState from '../useStoredState'
import useSyncUrlState from '../useSyncUrlState'
import { urlState } from '../useSyncUrlState/utils'
import { UseStoredUrlStateProps } from './types'

/*
    The priority of the initial value should be: url parameters > local storage > default
*/

const useStoredUrlState = <T,>(args: UseStoredUrlStateProps<T>) => {
  const [paramState, setParamState, nullParam] = useSyncUrlState(args)

  const [storedState, setStoredState] = useStoredState<T>(
    args.storeKey,
    args.defaultValue,
  )

  const [state, setState] = useState(nullParam ? storedState : paramState)

  const dispatchState: React.Dispatch<React.SetStateAction<T>> = useCallback(
    (dispatch) =>
      setState((prev) => {
        const nextState =
          dispatch instanceof Function ? dispatch(prev) : dispatch

        setParamState(nextState)
        setStoredState(nextState)
        return nextState
      }),
    [],
  )

  useEffect(() => {
    if (nullParam) urlState.set(storedState, args)
  }, [])

  return [state, dispatchState] as const
}

export default useStoredUrlState
