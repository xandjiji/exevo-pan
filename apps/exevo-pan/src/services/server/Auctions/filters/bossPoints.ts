import { DEFAULT_FILTER_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'
import { FilterQuery } from 'types/FilterQuery'

const filterQuery: FilterQuery = {
  filterSkip: ({ bossPoints }) =>
    bossPoints === DEFAULT_FILTER_OPTIONS.bossPoints,
  addQuery: ({ bossPoints }) => ({ bossPoints: { gte: bossPoints } }),
}

export default filterQuery
