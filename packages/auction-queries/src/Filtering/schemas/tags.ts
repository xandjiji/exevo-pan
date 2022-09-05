const filterSkip: FilterSkip = ({ tags }): boolean => tags.size === 0

const filterTest: FilterTest =
  ({ tags: tagsSet }) =>
  ({ tags }): boolean => {
    const characterTagsSet = new Set(tags)

    return [...tagsSet].every((quest) => characterTagsSet.has(quest))
  }

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
