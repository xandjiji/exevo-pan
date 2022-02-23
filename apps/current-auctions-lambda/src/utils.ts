export const filterOldAuctions = (
  auctionArray: CharacterObject[],
): CharacterObject[] => {
  const currentTimestamp = Math.round(+new Date() / 1000)

  let i = 0
  while (i < auctionArray.length) {
    if (auctionArray[i].auctionEnd < currentTimestamp) {
      auctionArray.shift()
    } else {
      return auctionArray
    }
    i += 1
  }
  return auctionArray
}
