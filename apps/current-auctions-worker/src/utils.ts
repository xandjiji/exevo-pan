export const filterOldAuctions = (
  auctionArray: CharacterObject[],
  currentTimestamp: number,
): CharacterObject[] => {
  const mutatedArray = [...auctionArray]

  auctionArray.some((characterObject) => {
    if (currentTimestamp > characterObject.auctionEnd) {
      mutatedArray.shift()
      return false
    }
    return true
  })

  return mutatedArray
}
