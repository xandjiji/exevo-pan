/* eslint-disable prefer-destructuring */
import { useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useStoredState } from 'hooks'
import { parse } from './utils'
import { HistoryEntry } from './types'

const useHistory = () => {
  const [list, setList] = useStoredState<HistoryEntry[]>(
    'loot-split-history',
    [],
  )

  const [selected, setSelected] = useState<HistoryEntry | undefined>(list[0])

  const add = useCallback(
    (rawData: string) =>
      setList((prev) =>
        [
          ...prev,
          {
            key: uuidv4(),
            timestamp: parse.SessionTimestamp(rawData),
            rawData,
          },
        ].sort((a, b) => b.timestamp - a.timestamp),
      ),
    [setList],
  )

  const remove = useCallback(
    (deleteKey: string) => {
      let newFirstItem: HistoryEntry | undefined

      setList((prev) => {
        const updatedList = prev.filter(({ key }) => deleteKey !== key)

        newFirstItem = updatedList[0]
        return updatedList
      })

      setSelected(newFirstItem)
    },
    [setList],
  )

  const select = useCallback(
    (selectKey: string) =>
      setSelected(list.find(({ key }) => key === selectKey)),
    [list],
  )

  return {
    list,
    selected,
    action: { add, remove, select },
  }
}

export default useHistory
