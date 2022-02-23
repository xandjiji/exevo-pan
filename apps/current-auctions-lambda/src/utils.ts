export const filterOldAuctions = (
  auctionArray: CharacterObject[],
): CharacterObject[] => {
  const currentTimestamp = Math.round(+new Date() / 1000)
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
