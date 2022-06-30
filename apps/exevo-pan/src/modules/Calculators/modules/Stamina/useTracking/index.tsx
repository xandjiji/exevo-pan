import { useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useStoredState } from 'hooks'
import { TrackData, AddArgs } from './types'

const useTracking = () => {
  const [list, setList] = useStoredState<TrackData[]>('tracked-staminas', [])

  const add = useCallback(
    ({ currentStamina, targetStamina }: AddArgs) =>
      setList((prev) => [
        ...prev,
        {
          key: uuidv4(),
          name: `New character (${prev.length + 1})`,
          currentStamina,
          targetStamina,
          timestamp: +new Date(),
        },
      ]),
    [setList],
  )

  return { list, action: { add } }
}

export default useTracking
