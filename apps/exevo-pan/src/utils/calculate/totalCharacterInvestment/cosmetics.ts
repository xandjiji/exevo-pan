import { priceMap as mountPrices } from 'data-dictionary/dist/dictionaries/storeMount'
import { priceMap as outfitPrices } from 'data-dictionary/dist/dictionaries/storeOutfit'
import { NotifyErrorClient } from 'services'

const getCosmeticsValue = (
  character: CharacterObject,
  auctionId: number,
): number => {
  const { storeMounts, storeOutfits } = character
  let sum = 0

  storeMounts.forEach((mountName) => {
    const foundPrice = mountPrices[mountName]
    if (foundPrice) {
      sum += foundPrice
    } else {
      NotifyErrorClient.setMessage({ mountName, auctionId })
    }
  })

  storeOutfits.forEach(({ name }) => {
    const foundPrice = outfitPrices[name]
    if (foundPrice) {
      sum += foundPrice
    } else {
      NotifyErrorClient.setMessage({ name, auctionId })
    }
  })

  return sum
}

export default getCosmeticsValue
