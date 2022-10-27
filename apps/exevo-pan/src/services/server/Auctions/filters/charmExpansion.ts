import { FilterQuery } from 'types/FilterQuery'

const filterQuery: FilterQuery = {
  filterSkip: ({ charmExpansion }) => !charmExpansion,
  addQuery: () => ({ charmInfo: { is: { expansion: true } } }),
}

export default filterQuery
