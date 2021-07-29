export const applySort = (
  oldData: CharacterObject[],
  sortingMode: number,
  descendingOrder: boolean,
): CharacterObject[] => {
  const data = [...oldData]

  switch (sortingMode) {
    case 0:
      return data.sort(byAuctionEnd)

    case 1:
      return data.sort(byLevel)

    case 2:
      return data.sort(byPrice)

    case 3:
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
