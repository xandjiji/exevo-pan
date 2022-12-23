import { dictionary as tagDictionary } from 'data-dictionary/dist/dictionaries/characterTags'
import { constTokens as achievementTokens } from 'data-dictionary/dist/dictionaries/rareAchievement'

const PRIMAL_ORDEAL = {
  MINIMUM_LEVEL: 250,
  ACHIEVEMENT: achievementTokens['Royalty of Hazard'],
}

const filterSkip: FilterSkip = ({ tags }): boolean =>
  !tags.has(tagDictionary.soulwarAvailable)

const filterTest: FilterTest =
  () =>
  ({ level, rareAchievements }): boolean =>
    level >= PRIMAL_ORDEAL.MINIMUM_LEVEL &&
    !rareAchievements.some(
      (achievement) => achievement === PRIMAL_ORDEAL.ACHIEVEMENT,
    )

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
