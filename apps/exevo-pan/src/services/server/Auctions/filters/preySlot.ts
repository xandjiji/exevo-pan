import { FilterQuery } from 'types/FilterQuery'

const filterQuery: FilterQuery = {
  filterSkip: ({ preySlot }) => !preySlot,
  addQuery: () => ({ preySlot: true }),
}

export default filterQuery
