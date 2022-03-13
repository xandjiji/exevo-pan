const filterSkip: FilterSkip = ({ imbuementsSet }): boolean =>
  imbuementsSet.size === 0

const filterTest: FilterTest =
  ({ imbuementsSet }) =>
  ({ imbuements }): boolean => {
    const characterImbuementsSet = new Set(imbuements)

    return [...imbuementsSet].every((imbuement) =>
      characterImbuementsSet.has(imbuement),
    )
  }

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
