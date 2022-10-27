import { FilterQuery } from 'types/FilterQuery'

const filterQuery: FilterQuery = {
  filterSkip: ({ huntingSlot }) => !huntingSlot,
  addQuery: () => ({ huntingSlot: true }),
}

export default filterQuery
