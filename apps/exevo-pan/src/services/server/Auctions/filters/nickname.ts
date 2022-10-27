import { FilterQuery } from 'types/FilterQuery'

const filterQuery: FilterQuery = {
  filterSkip: ({ nicknameFilter }) => nicknameFilter.length === 0,
  addQuery: ({ nicknameFilter }) => ({
    nickname: { contains: nicknameFilter, mode: 'insensitive' },
  }),
}

export default filterQuery
