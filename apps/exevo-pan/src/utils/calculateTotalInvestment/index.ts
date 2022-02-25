import getStoreItemValue from './storeItems'
import getHirelingsValue from './hirelings'

const CHARM_EXPANSION_VALUE = 450
const HUNTING_SLOT_VALUE = 750
const PREY_SLOT_VALUE = 900

/* outfits */
/* mounts */

export const calculateTotalInvestment = (
  character: CharacterObject,
): number => {
  const {
    charmInfo,
    huntingSlot,
    preySlot,
    hirelings,
    storeItems: characterStoreItems,
  } = character

  let sum = 0

  if (charmInfo.expansion) sum += CHARM_EXPANSION_VALUE
  if (huntingSlot) sum += HUNTING_SLOT_VALUE
  if (preySlot) sum += PREY_SLOT_VALUE
  if (hirelings.count) sum += getHirelingsValue(hirelings)

  sum += getStoreItemValue(characterStoreItems)

  return sum
}
