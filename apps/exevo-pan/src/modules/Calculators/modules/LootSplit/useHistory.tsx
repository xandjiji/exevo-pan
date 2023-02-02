/* eslint-disable prefer-destructuring */
import { useState, useCallback } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-hot-toast'
import { useStoredState } from 'hooks'
import { parse } from './utils'
import { HistoryEntry, ExtraExpenses } from './types'

const useHistory = () => {
  const {
    translations: { calculators },
  } = useTranslations()

  const [list, setList] = useStoredState<HistoryEntry[]>(
    'loot-split-history',
    [],
  )

  const [selected, setSelected] = useState<HistoryEntry | undefined>(list[0])

  const add = useCallback(
    (
      rawData: string,
      extraExpenses: ExtraExpenses,
      removedPlayers: string[],
    ) => {
      setList((prev) =>
        [
          ...prev,
          {
            key: uuidv4(),
            timestamp: parse.SessionTimestamp(rawData),
            rawData,
            extraExpenses,
            removedPlayers,
          },
        ].sort((a, b) => b.timestamp - a.timestamp),
      )

      toast.success(calculators.LootSplit.toast.added)
    },
    [setList],
  )

  const remove = useCallback(
    (deleteKey: string) => {
      let newFirstItem: HistoryEntry | undefined
      let deletedIndex = 0

      setList((prev) => {
        const updatedList = prev.filter(({ key }, index) => {
          const wontBeDeleted = deleteKey !== key

          if (!wontBeDeleted) deletedIndex = index

          return wontBeDeleted
        })

        newFirstItem =
          updatedList[deletedIndex] ?? updatedList[deletedIndex - 1]

        return updatedList
      })

      setSelected(newFirstItem)
      toast.success(calculators.LootSplit.toast.removed)
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
