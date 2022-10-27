import { DEFAULT_FILTER_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'
import { FilterQuery } from 'types/FilterQuery'

const filterQuery: FilterQuery = {
  filterSkip: ({ tcInvested }) =>
    tcInvested === DEFAULT_FILTER_OPTIONS.tcInvested,
  addQuery: ({ tcInvested }) => ({ tcInvested: { gte: tcInvested } }),
}

export default filterQuery
