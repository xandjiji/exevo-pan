const filterSkip: FilterSkip = ({ charmsSet }): boolean => charmsSet.size === 0

const filterTest: FilterTest =
  ({ charmsSet }) =>
  ({ charms }): boolean => {
    const characterCharmsSet = new Set(charms)

    return [...charmsSet].every((charm) => characterCharmsSet.has(charm))
  }

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
