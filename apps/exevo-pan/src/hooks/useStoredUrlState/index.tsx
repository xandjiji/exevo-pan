import useStoredState from '../useStoredState'
import useSynchUrlState from '../useSynchUrlState'
import { UseStoredUrlStateProps } from './types'

const useStoredUrlState = <T,>(args: UseStoredUrlStateProps<T>) => {
  const { initialValue, isDefault, subscribe } = useSynchUrlState(args)

  const [state, setState] = useStoredState<T>(
    args.storeKey,
    initialValue,
    isDefault ? undefined : initialValue,
  )
  subscribe(state)

  return [state, setState] as const
}

export default useStoredUrlState
