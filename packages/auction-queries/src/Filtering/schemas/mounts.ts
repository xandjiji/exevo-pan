const filterSkip: FilterSkip = ({ mountSet }): boolean => mountSet.size === 0

const filterTest: FilterTest = ({ mountSet }) => {
  const selectedMounts = [...mountSet]

  return ({ mounts }): boolean => {
    const characterMountsSet = new Set(mounts)

    return selectedMounts.every((mount) => characterMountsSet.has(mount))
  }
}

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
