import { priceMap as mountPrices } from 'data-dictionary/dist/dictionaries/storeMount'
import { priceMap as outfitPrices } from 'data-dictionary/dist/dictionaries/storeOutfit'

const getCosmeticsValue = (character: CharacterObject): number => {
  const { storeMounts, storeOutfits } = character
  let sum = 0

  storeMounts.forEach((mountName) => {
    const foundPrice = mountPrices[mountName]
    if (foundPrice) {
      sum += foundPrice
    } else {
      /* @ ToDo: notify */
      console.log(`Mount: [${mountName}] not found`)
    }
  })

  storeOutfits.forEach(({ name }) => {
    const foundPrice = outfitPrices[name]
    if (foundPrice) {
      sum += foundPrice
    } else {
      /* @ ToDo: notify */
      console.log(`Outfit: [${name}] not found`)
    }
  })

  return sum
}

export default getCosmeticsValue
