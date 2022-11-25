import { useState, useMemo, useCallback, useEffect } from 'react'

type UseRareItemSet = {
  rareItemData: RareItemData
  setFilters: (newValues: Partial<FilterOptions>) => void
  currentFilterSet: Set<number>
}

const useRareItemSet = ({
  rareItemData,
  currentFilterSet,
  setFilters,
}: UseRareItemSet) => {
  const [selectedItemData, setSelectedItemData] = useState<RareItemData>({})

  useEffect(() => {
    if (currentFilterSet.size === 0) setSelectedItemData({})
  }, [currentFilterSet])

  const setSelectedItemDataAndDispatch: typeof setSelectedItemData =
    useCallback(
      (newState) => {
        setSelectedItemData((prev) => {
          const nextState =
            newState instanceof Function ? newState(prev) : newState

          setFilters({
            auctionIds: new Set<number>(Object.values(nextState).flat()),
          })
          return nextState
        })
      },
      [setFilters],
    )

  const itemList: Option[] = useMemo(() => {
    const selectedItems = new Set(Object.keys(selectedItemData))

    return Object.keys(rareItemData)
      .filter((item) => !selectedItems.has(item))
      .map((name) => ({ name, value: name }))
  }, [rareItemData, selectedItemData])

  const allSelected = itemList.length === 0

  const toggle = useCallback(
    (item: string) =>
      setSelectedItemDataAndDispatch((prev) => {
        const newItems = { ...prev }
        if (newItems[item]) {
          delete newItems[item]
        } else {
          newItems[item] = rareItemData[item]
        }

        return newItems
      }),
    [setSelectedItemDataAndDispatch, rareItemData, selectedItemData],
  )

  const toggleAll = useCallback(
    () =>
      setSelectedItemDataAndDispatch(() =>
        allSelected ? {} : { ...rareItemData },
      ),
    [setSelectedItemDataAndDispatch, rareItemData, allSelected],
  )

  return {
    itemList,
    selectedItemData,
    allSelected,
    action: {
      toggle,
      toggleAll,
    },
  }
}

export default useRareItemSet
