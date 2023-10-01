export const filterOldAuctions = (
  auctionArray: CharacterObject[],
): CharacterObject[] => {
  const currentTimestamp = Math.round(+new Date() / 1000)

  while (auctionArray.length > 0) {
    const [topAuction] = auctionArray
    if (topAuction.auctionEnd <= currentTimestamp) {
      auctionArray.shift()
    } else {
      return auctionArray
    }
  }
  return auctionArray
}
