const filterSkip: FilterSkip = ({ achievementSet }): boolean =>
  achievementSet.size === 0

const filterTest: FilterTest =
  ({ achievementSet }) =>
  ({ rareAchievements }): boolean => {
    const characterAchievementsSet = new Set(rareAchievements)

    return [...achievementSet].every((achievement) =>
      characterAchievementsSet.has(achievement),
    )
  }

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
