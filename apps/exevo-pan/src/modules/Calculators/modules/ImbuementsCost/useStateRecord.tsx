import { useCallback } from 'react'
import { useStoredState } from 'hooks'
import { DEFAULT_STATE } from './schema'
import { StateRecord } from './types'

const useStateRecord = () => {
  const [stateRecord, setState] = useStoredState<StateRecord>(
    'imbuements-cost',
    DEFAULT_STATE,
  )

  const update = useCallback(
    (entries: StateRecord) => setState((prev) => ({ ...prev, ...entries })),
    [setState],
  )

  return [stateRecord, update] as const
}

export default useStateRecord
