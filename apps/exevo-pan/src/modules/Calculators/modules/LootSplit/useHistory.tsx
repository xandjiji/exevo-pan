import { useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useStoredState } from 'hooks'
import { parse } from './utils'
import { HistoryEntry } from './types'

const useHistory = () => {
  const [list, setList] = useStoredState<HistoryEntry[]>(
    'loot-split-history',
    [],
  )

  const add = useCallback(
    (rawData) =>
      setList((prev) => [
        ...prev,
        {
          key: uuidv4(),
          timestamp: parse.SessionTimestamp(rawData),
          rawData,
        },
      ]),
    [setList],
  )

  const remove = useCallback(
    (deleteKey: string) =>
      setList((prev) => prev.filter(({ key }) => deleteKey !== key)),
    [setList],
  )

  return { list, action: { add, remove } }
}

export default useHistory
