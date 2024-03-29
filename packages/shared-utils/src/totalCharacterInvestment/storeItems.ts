import { storeItems } from 'data-dictionary/dist/dictionaries/store'

const getStoreItemValue = (characterStoreItems: CharacterItem[]): number => {
  let sum = 0

  characterStoreItems.forEach(({ name, amount }) => {
    const foundItem = storeItems[name]
    if (foundItem) {
      sum += foundItem.value * amount
    } else {
      /* @ ToDo: notify */
    }
  })

  return sum
}

export default getStoreItemValue
