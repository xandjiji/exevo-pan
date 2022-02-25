import { storeItems } from 'data-dictionary/dist/dictionaries/store'

export default (characterStoreItems: CharacterItem[]): number => {
  let sum = 0

  characterStoreItems.forEach(({ name, amount }) => {
    const foundItem = storeItems[name]
    if (foundItem) {
      sum += foundItem.value * amount
    } else {
      /* @ ToDo: notify */
      console.log(`Store Item: [${name}] not found`)
    }
  })

  return sum
}
