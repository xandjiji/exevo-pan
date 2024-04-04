const filterSkip: FilterSkip = ({ greaterGemsSet }): boolean =>
  greaterGemsSet.size === 0

const filterTest: FilterTest =
  ({ greaterGemsSet }) =>
  ({ greaterGems }): boolean => {
    const characterGreaterGemsSet = new Set(greaterGems)

    return [...greaterGemsSet].every((gem) => characterGreaterGemsSet.has(gem))
  }

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
