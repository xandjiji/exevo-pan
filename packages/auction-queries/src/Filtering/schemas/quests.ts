const filterSkip: FilterSkip = ({ questSet }): boolean => questSet.size === 0

const filterTest: FilterTest = ({ questSet }) => {
  const selectedQuests = [...questSet]

  return ({ quests }): boolean => {
    const characterQuestsSet = new Set(quests)

    return selectedQuests.every((quest) => characterQuestsSet.has(quest))
  }
}

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
