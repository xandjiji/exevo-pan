import { SortingMode } from './types'

export const applySort = (
  oldData: CharacterObject[],
  sortingMode: SortingMode,
  descendingOrder: boolean,
): CharacterObject[] => {
  const data = [...oldData]

  switch (sortingMode) {
    case 'Auction End':
      return data.sort(byAuctionEnd)

    case 'Level':
      return data.sort(byLevel)

    case 'Price':
      return data.sort(byPrice)

    case 'Price (bidded only)':
      return data.filter(item => item.hasBeenBidded).sort(byPrice)

    default:
      return data
  }

  function byAuctionEnd(a: CharacterObject, b: CharacterObject) {
    if (!descendingOrder) return a.auctionEnd - b.auctionEnd
    return b.auctionEnd - a.auctionEnd
  }

  function byLevel(a: CharacterObject, b: CharacterObject) {
    if (!descendingOrder) return a.level - b.level
    return b.level - a.level
  }

  function byPrice(a: CharacterObject, b: CharacterObject) {
    if (!descendingOrder) return a.currentBid - b.currentBid
    return b.currentBid - a.currentBid
  }
}
