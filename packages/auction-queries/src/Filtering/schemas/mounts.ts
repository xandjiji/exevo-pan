const filterSkip: FilterSkip = ({ mountSet }): boolean => mountSet.size === 0

const filterTest: FilterTest =
  ({ mountSet }) =>
  ({ mounts }): boolean => {
    const characterMountsSet = new Set(mounts)

    return [...mountSet].every((mount) => characterMountsSet.has(mount))
  }

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
