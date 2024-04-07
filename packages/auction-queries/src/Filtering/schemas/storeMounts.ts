const filterSkip: FilterSkip = ({ storeMountSet }): boolean =>
  storeMountSet.size === 0

const filterTest: FilterTest = ({ storeMountSet }) => {
  const selectedStoreMounts = [...storeMountSet]

  return ({ storeMounts }): boolean => {
    const characterMountsSet = new Set(storeMounts)

    return selectedStoreMounts.every((mount) => characterMountsSet.has(mount))
  }
}

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
