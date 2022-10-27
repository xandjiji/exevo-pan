import { FilterQuery } from 'types/FilterQuery'

const filterQuery: FilterQuery = {
  filterSkip: ({ hireling }) => !hireling,
  addQuery: () => ({ hirelings: { is: { count: { gt: 0 } } } }),
}

export default filterQuery
