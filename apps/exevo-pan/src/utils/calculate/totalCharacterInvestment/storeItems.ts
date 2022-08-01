import { storeItems } from 'data-dictionary/dist/dictionaries/store'
import { NotifyErrorClient } from 'services'

const getStoreItemValue = (
  characterStoreItems: CharacterItem[],
  auctionId: number,
): number => {
  let sum = 0

  characterStoreItems.forEach(({ name, amount }) => {
    const foundItem = storeItems[name]
    if (foundItem) {
      sum += foundItem.value * amount
    } else {
      NotifyErrorClient.setMessage({ name, auctionId })
    }
  })

  return sum
}

export default getStoreItemValue
