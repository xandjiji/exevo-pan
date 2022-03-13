import getStoreItemValue from './storeItems'
import getHirelingsValue from './hirelings'
import getCosmeticsValue from './cosmetics'

const CHARM_EXPANSION_VALUE = 450
const HUNTING_SLOT_VALUE = 750
const PREY_SLOT_VALUE = 900

export const calculateTotalInvestment = (
  character: CharacterObject,
): number => {
  return character.id
  const { id, charmInfo, huntingSlot, preySlot, hirelings, storeItems } =
    character

  let sum = 0

  if (charmInfo.expansion) sum += CHARM_EXPANSION_VALUE
  if (huntingSlot) sum += HUNTING_SLOT_VALUE
  if (preySlot) sum += PREY_SLOT_VALUE
  if (hirelings.count) sum += getHirelingsValue(hirelings)

  sum += getCosmeticsValue(character, id)
  sum += getStoreItemValue(storeItems, id)

  return sum
}
