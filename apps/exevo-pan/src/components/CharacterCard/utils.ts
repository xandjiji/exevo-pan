const CHARM_EXPANSION_VALUE = 450
const HUNTING_SLOT_VALUE = 750
const PREY_SLOT_VALUE = 900

/* @ ToDo: */

/* outfits */
/* mounts */
/* hirelings */
/* store items */

export const calculateTotalInvestment = (
  character: CharacterObject,
): number => {
  const { charmInfo, huntingSlot, preySlot } = character

  let sum = 0

  if (charmInfo.expansion) sum += CHARM_EXPANSION_VALUE
  if (huntingSlot) sum += HUNTING_SLOT_VALUE
  if (preySlot) sum += PREY_SLOT_VALUE

  return sum
}
