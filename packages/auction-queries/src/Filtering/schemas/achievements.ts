const filterSkip: FilterSkip = ({ achievementSet }): boolean =>
  achievementSet.size === 0

const filterTest: FilterTest = ({ achievementSet }) => {
  const selectedAchievements = [...achievementSet]

  return ({ rareAchievements }): boolean => {
    const characterAchievementsSet = new Set(rareAchievements)

    return selectedAchievements.every((achievement) =>
      characterAchievementsSet.has(achievement),
    )
  }
}

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
