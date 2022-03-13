const filterSkip: FilterSkip = ({ outfitSet }): boolean => outfitSet.size === 0

const filterTest: FilterTest = ({ outfitSet, sex, addon }) => {
  const filterSize = outfitSet.size
  const addonRequired = addon !== 0

  return ({ outfits, sex: characterSex }): boolean => {
    if (sex !== characterSex) return false

    let foundCount = 0
    // eslint-disable-next-line no-restricted-syntax
    for (const { name, type } of outfits) {
      if (outfitSet.has(name)) {
        foundCount += 1
        const hasAllAddons = type === 3

        if (addonRequired && !hasAllAddons) {
          if (addon !== type) return false
        }
      }

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
