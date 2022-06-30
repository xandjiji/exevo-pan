import { useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useStoredState } from 'hooks'
import { TrackData, AddArgs, UpdateArgs } from './types'

const useTracking = () => {
  const [list, setList] = useStoredState<TrackData[]>('tracked-staminas', [])

  const add = useCallback(
    ({ currentStamina, targetStamina }: AddArgs) =>
      setList((prev) => [
        ...prev,
        {
          key: uuidv4(),
          name: `Character (${prev.length + 1})`,
          currentStamina,
          targetStamina,
          timestamp: +new Date(),
        },
      ]),
    [setList],
  )

  const update = useCallback(
    ({ key, ...rest }: UpdateArgs) =>
      setList((prev) =>
        prev.map((data) => (data.key === key ? { ...data, ...rest } : data)),
      ),
    [setList],
  )

  return { list, action: { add, update } }
}

export default useTracking
