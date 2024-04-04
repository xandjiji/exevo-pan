const filterSkip: FilterSkip = ({ charmsSet }): boolean => charmsSet.size === 0

const filterTest: FilterTest = ({ charmsSet }) => {
  const selectedCharms = [...charmsSet]

  return ({ charms }): boolean => {
    const characterCharmsSet = new Set(charms)

    return selectedCharms.every((charm) => characterCharmsSet.has(charm))
  }
}

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
