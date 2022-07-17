import { useMemo, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useStoredState } from 'hooks'
import { parse } from './utils'
import { HistoryEntry } from './types'

const useHistory = () => {
  const [list, setList] = useStoredState<HistoryEntry[]>(
    'loot-split-history',
    [],
  )

  const sortedList = useMemo(
    () => list.sort((a, b) => b.timestamp - a.timestamp),
    [list],
  )

  const add = useCallback(
    (rawData: string) =>
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

  return { list: sortedList, action: { add, remove } }
}

export default useHistory
