import { DEFAULT_FILTER_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'

const filterSkip: FilterSkip = ({ achievementPoints }): boolean =>
  achievementPoints === DEFAULT_FILTER_OPTIONS.achievementPoints

const filterTest: FilterTest =
  ({ achievementPoints: minAchievementPoints }) =>
  ({ achievementPoints }): boolean =>
    achievementPoints >= minAchievementPoints

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
