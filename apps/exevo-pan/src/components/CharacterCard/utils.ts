import { storeItems } from 'data-dictionary/dist/dictionaries/store'

const CHARM_EXPANSION_VALUE = 450
const HUNTING_SLOT_VALUE = 750
const PREY_SLOT_VALUE = 900

/* @ ToDo: */
/* refactor files */

/* outfits */
/* mounts */

const HIRELING_BASE_VALUE = 150

const MIN_HIRELING_JOB_VALUE = 250
const MAX_HIRELING_JOB_VALUE = 900
const MAX_HIRELING_TOTAL_JOB_VALUE =
  3 * MIN_HIRELING_JOB_VALUE + MAX_HIRELING_JOB_VALUE

const MIN_DRESS_VALUE = 300
const MEDIUM_DRESS_VALUE = 500
const MAX_DRESS_VALUE = 900

const MAX_MEDIUM_SUM = 4 * MEDIUM_DRESS_VALUE

const getJobValue = (jobs: number): number =>
  jobs <= 3 ? jobs * MIN_HIRELING_JOB_VALUE : MAX_HIRELING_TOTAL_JOB_VALUE

const getDressValue = (outfits: number): number => {
  if (outfits === 0) return 0

  let sum = MIN_DRESS_VALUE

  if (outfits >= 6) {
    sum += MAX_MEDIUM_SUM
    sum += (outfits - 5) * MAX_DRESS_VALUE
    return sum
  }

  if (outfits >= 2) {
    sum += (outfits - 1) * MEDIUM_DRESS_VALUE
    return sum
  }

  return sum
}

const getHirelingsValue = ({ count, jobs, outfits }: HirelingsInfo): number => {
  let sum = 0

  sum += count * HIRELING_BASE_VALUE
  sum += getJobValue(jobs)
  sum += getDressValue(outfits)

  return sum
}

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
    hirelings,
    storeItems: characterStoreItems,
  } = character

  let sum = 0

  if (charmInfo.expansion) sum += CHARM_EXPANSION_VALUE
  if (huntingSlot) sum += HUNTING_SLOT_VALUE
  if (preySlot) sum += PREY_SLOT_VALUE
  if (hirelings.count) sum += getHirelingsValue(hirelings)

  sum += getStoreValue(characterStoreItems)

  return sum
}
