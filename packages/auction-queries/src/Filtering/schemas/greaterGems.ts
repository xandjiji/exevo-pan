const filterSkip: FilterSkip = ({ greaterGemsSet }): boolean =>
  greaterGemsSet.size === 0

const filterTest: FilterTest = ({ greaterGemsSet }) => {
  const selectedGems = [...greaterGemsSet]

  return ({ greaterGems }): boolean => {
    const characterGreaterGemsSet = new Set(greaterGems)

    return selectedGems.every((gem) => characterGreaterGemsSet.has(gem))
  }
}

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
