export const filterHighlightedAuctions = (
  allAuctionData: CharacterObject[],
  highlightedAuctionsData: HighlightedAuction[],
): CharacterObject[] => {
  const highlightedIdSet = new Set(
    highlightedAuctionsData.map((highlighted) => highlighted.id),
  )

  const currentTimestamp = +new Date() / 1000

  return allAuctionData
    .filter((auction) => highlightedIdSet.has(auction.id))
    .filter((auction) => auction.auctionEnd > currentTimestamp)
}
