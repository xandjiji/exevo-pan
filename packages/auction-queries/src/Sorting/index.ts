const DEFAULT_SORT_MODE = 0
const DEFAULT_DESCENDING_ORDER = false

const defaultOptions: SortOptions = {
  sortingMode: DEFAULT_SORT_MODE,
  descendingOrder: DEFAULT_DESCENDING_ORDER,
}

export const applySort = (
  oldData: CharacterObject[],
  { sortingMode, descendingOrder } = defaultOptions,
): CharacterObject[] => {
  const data = [...oldData]

  /* the data is already sorted by this default */
  if (
    sortingMode === DEFAULT_SORT_MODE &&
    descendingOrder === DEFAULT_DESCENDING_ORDER
  ) {
    return data
  }

  const byAuctionEnd = (a: CharacterObject, b: CharacterObject) => {
    if (!descendingOrder) return a.auctionEnd - b.auctionEnd
    return b.auctionEnd - a.auctionEnd
  }

  const byLevel = (a: CharacterObject, b: CharacterObject) => {
    if (!descendingOrder) return a.level - b.level
    return b.level - a.level
  }

  const byPrice = (a: CharacterObject, b: CharacterObject) => {
    if (!descendingOrder) return a.currentBid - b.currentBid
    return b.currentBid - a.currentBid
  }

  switch (sortingMode) {
    case 0:
      return data.sort(byAuctionEnd)

    case 1:
      return data.sort(byLevel)

    case 2:
      return data.sort(byPrice)

    case 3:
      return data.filter((item) => item.hasBeenBidded).sort(byPrice)

    default:
      return data
  }
}
