import { storeItems } from 'data-dictionary/dist/dictionaries/store'

const CHARM_EXPANSION_VALUE = 450
const HUNTING_SLOT_VALUE = 750
const PREY_SLOT_VALUE = 900

/* @ ToDo: */

/* outfits */
/* mounts */
/* hirelings */

const getStoreValue = (characterStoreItems: CharacterItem[]): number => {
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

export const calculateTotalInvestment = (
  character: CharacterObject,
): number => {
  const {
    charmInfo,
    huntingSlot,
    preySlot,
    storeItems: characterStoreItems,
  } = character

  let sum = 0

  if (charmInfo.expansion) sum += CHARM_EXPANSION_VALUE
  if (huntingSlot) sum += HUNTING_SLOT_VALUE
  if (preySlot) sum += PREY_SLOT_VALUE

  sum += getStoreValue(characterStoreItems)

  return sum
}
