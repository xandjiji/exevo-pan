import { DEFAULT_FILTER_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'
import { FilterQuery } from 'types/FilterQuery'

const filterQuery: FilterQuery = {
  filterSkip: ({ minLevel, maxLevel }) =>
    minLevel === DEFAULT_FILTER_OPTIONS.minLevel &&
    maxLevel === DEFAULT_FILTER_OPTIONS.maxLevel,
  addQuery: ({ minLevel, maxLevel }) => ({
    level: { gte: minLevel, lte: maxLevel },
  }),
}

export default filterQuery
