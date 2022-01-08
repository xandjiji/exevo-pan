const filterSkip: FilterSkip = ({ storeOutfitSet }): boolean =>
  storeOutfitSet.size === 0

const filterTest: FilterTest = ({ storeOutfitSet, sex }) => {
  const filterSize = storeOutfitSet.size

  return ({ storeOutfits, sex: characterSex }): boolean => {
    if (sex !== characterSex) return false

    let foundCount = 0
    // eslint-disable-next-line no-restricted-syntax
    for (const { name } of storeOutfits) {
      if (storeOutfitSet.has(name)) foundCount += 1
      if (foundCount === filterSize) return true
    }

    return false
  }
}

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
