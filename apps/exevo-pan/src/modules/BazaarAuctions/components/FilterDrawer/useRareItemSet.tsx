import { useState, useMemo, useCallback } from 'react'

const useRareItemSet = (rareItemData: RareItemData) => {
  const [selectedItemData, setSelectedItemData] = useState<RareItemData>({})

  const itemList: Option[] = useMemo(() => {
    const selectedItems = new Set(Object.keys(selectedItemData))

    return Object.keys(rareItemData)
      .filter((item) => !selectedItems.has(item))
      .map((name) => ({ name, value: name }))
  }, [rareItemData, selectedItemData])

  const allSelected = itemList.length === 0

  const toggle = useCallback(
    (item: string) =>
      setSelectedItemData((prev) => {
        const newItems = { ...prev }
        if (newItems[item]) {
          delete newItems[item]
        } else {
          newItems[item] = rareItemData[item]
        }

        return newItems
      }),
    [rareItemData, selectedItemData],
  )

  const toggleAll = useCallback(
    () => setSelectedItemData(() => (allSelected ? {} : { ...rareItemData })),
    [rareItemData, allSelected],
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
