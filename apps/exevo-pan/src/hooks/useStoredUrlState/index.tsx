import { useCallback, useEffect } from 'react'
import useStoredState from '../useStoredState'
import useSyncUrlState from '../useSyncUrlState'
import { urlState } from '../useSyncUrlState/utils'
import { UseStoredUrlStateProps } from './types'

const useStoredUrlState = <T,>(args: UseStoredUrlStateProps<T>) => {
  const [storedState, setStoredState] = useStoredState<T>(
    args.storeKey,
    args.defaultValue,
  )

  const [paramState, setParamState, isDefault] = useSyncUrlState(args)

  const setState: React.Dispatch<React.SetStateAction<T>> = useCallback(
    (dispatch) => {
      setParamState((prev) => {
        const nextState =
          dispatch instanceof Function ? dispatch(prev) : dispatch
        setStoredState(nextState)
        return nextState
      })
    },
    [],
  )

  useEffect(() => {
    if (isDefault) urlState.set(storedState, args)
  }, [])

  return [isDefault ? storedState : paramState, setState] as const
}

export default useStoredUrlState
