import { DEFAULT_FILTER_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'

const filterSkip: FilterSkip = ({ bossPoints }): boolean =>
  bossPoints === DEFAULT_FILTER_OPTIONS.bossPoints

const filterTest: FilterTest =
  ({ bossPoints: minBossPoints }) =>
  ({ bossPoints }): boolean =>
    bossPoints >= minBossPoints

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
