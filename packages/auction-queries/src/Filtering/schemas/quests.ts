const filterSkip: FilterSkip = ({ questSet }): boolean => questSet.size === 0

const filterTest: FilterTest =
  ({ questSet }) =>
  ({ quests }): boolean => {
    const characterQuestsSet = new Set(quests)

    return [...questSet].every((quest) => characterQuestsSet.has(quest))
  }

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
