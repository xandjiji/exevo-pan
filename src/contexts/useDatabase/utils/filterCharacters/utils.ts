export function setupRareItemsAuctions(
  itemNameSet: Set<string>,
  rareItemData: RareItemData,
): Set<number> {
  const auctionIdSet = new Set<number>([])

  for (const itemName of [...itemNameSet]) {
    for (const setItem of [...rareItemData[itemName]]) {
      auctionIdSet.add(setItem)
    }
  }

  return auctionIdSet
}

export function setDoesntHasValue<T>(set: Set<T>, value: T): boolean {
  if (set.size && !set.has(value)) {
    return true
  } else {
    return false
  }
}

export function setDoesntHasAnyValue<T>(
  set: Set<T>,
  valueArray: Array<T>,
): boolean {
  if (set.size === 0) return false

  const charImbuementSet = new Set(valueArray)

  for (const value of Array.from(set)) {
    if (!charImbuementSet.has(value)) return true
  }

  return false
}

/* @ ToDo: test if this is working */
const specialCharacters = /[äëïöüÿ'-.,]/i
const twoConsecutiveUppercase = /[A-Z][A-Z]/
export function isRareNickname(nickname: string): boolean {
  if (nickname.length <= 3) return true
  if (specialCharacters.test(nickname)) return true
  if (twoConsecutiveUppercase.test(nickname)) return true

  return false
}
